/**
 * Push notification handler.
 *
 * Requires that the Cordova push plugin has been installed:
 *   cordova plugin add https://github.com/phonegap-build/PushPlugin.git
 */

var sprintf = require('../../../bower_components/sprintf/src/sprintf.js').sprintf; // Using /src as /dist doesn't contain unminified code

var PushNotificationService = function (
  $rootScope, $state, $cordovaPush, $cordovaLocalNotification, acmUserDefaults, acmAPI) {

  var pushRegistrationFailed = function(err) {
    // TODO(leah): update this.
    console.error('Unable to register device with push server');
  };

  var handleAPNSNotification = function (event) {
    var pushNotification = window.plugins.pushNotification;

    // TODO(leah): Handle the alert / badge / sound
  };

  var handleGCMNotification = function (e) {
    var eventType = e.event;
    console.log('GCM push notification for event "' + eventType + '" received');

    if (eventType === 'registered') {
      // This could be skipped by checking whether or not a locally held copy of the id matches that
      // returned on registration. However, due to privacy concerns, the app is intended to record
      // as little information as possible, so just ping the server each time.
      acmAPI.registerDeviceForNotifications(e.regid, function() {
        console.info('registered device with push server');
      }, pushRegistrationFailed);
    } else if (eventType === 'message') {
      var payload = e.payload;
      // Due to the app's simplicity, right now there's no distinction between how messages received
      // in different states are handled. For now, just pull out the most recent action from the
      // message params and cache it.
      // var isColdstart = e.coldstart;
      var isForeground = e.foreground;
      acmUserDefaults.setUserDefault(
        acmUserDefaults.keys.MOST_RECENT_ACTION, payload['action']);
      acmUserDefaults.setUserDefault(
        acmUserDefaults.keys.MOST_RECENT_ACTION_URL,
        sprintf('https://act.eff.org/action/%s', payload['actionURLSuffix']));

      var currentState = $state.current.name;
      if (!isForeground) {
        // If the app is backgrounded, any push notification received redirects the user to the action
        // page, updated for the most recent action, irrespective of whether they've completed the
        // welcome carousel etc.
        if (currentState !== 'home') {
          $state.go('home');
        }
      } else {
        // If the app is foregrounded, there are some slightly more complex rules:
        // * If the user is looking at the action page, just update the visible action and suppress
        //   the push notification. This is confusing, but this situation should be very rare.
        // * If the user is browsing the carousel / at the post intro page, just spawn a notification.
        console.log(currentState);
        if (currentState === 'home') {
          $rootScope.$broadcast('refresh-home-page');
        } else {
          $cordovaLocalNotification.add({
            id: 'some_notification_id',
            title: 'this is a test',
            message: 'this is a message'
            // parameter documentation:
            // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
          }).then(function () {
            console.log('callback for adding background notification');
          });
        }
      }


    } else if (eventType === 'error') {
      console.error('GCM error received: ' + e.msg);
      // Deliberately left unhandled for now.
    }
  };

  var registrationSuccess = function(result) {
    console.log('Push registration success: ' + result);
  };

  var registrationError = function(error) {
    console.log('Push registration failed: ' + error);
  };

  var config = {
    'ANDROID': {
      'senderID': '804999034827',
      'ecb': 'pushNotificationEventBus'
    },
    'IOS': {

    }
  };

  return {

    register: function() {
      $cordovaPush.register(this.pushConfig()).then(registrationSuccess, registrationError);
    },

    pushConfig: function() {
      var devicePlatform = ionic.Platform.platform().toUpperCase();
      return config[devicePlatform];
    },

    handlePushNotification: function(event) {
      var devicePlatform = ionic.Platform.platform().toUpperCase();
      if (devicePlatform === 'ANDROID') {
        handleGCMNotification(event);
      } else if (devicePlatform === 'IOS') {

      }
    }
  };
};

module.exports = PushNotificationService;
