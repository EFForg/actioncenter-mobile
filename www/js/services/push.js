/**
 * Push notification handler.
 *
 * Requires that the Cordova push plugin has been installed:
 *   cordova plugin add https://github.com/phonegap-build/PushPlugin.git
 */

var PushNotificationService = function ($cordovaPush, acmAPI) {

  var devicePlatform;

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
      if (e.foreground) {
        console.debug('message received in the foreground');
      } else {
        if (e.coldstart) {
          console.debug('message received in the background as coldstart');
        } else {
          console.debug('message received in the background');
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
