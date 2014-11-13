/**
 * Helpers and utils for working with GCM push.
 */

var angular = require('angular');
var sprintf = require('sprintf');

var appSettings = require('../../../build/app_settings');
var constants = require('./constants');


var GCMNotificationService = function($state, $cordovaLocalNotification, acmUserDefaults, acmAPI, acmPushNotificationHelpers) {

  var gcmRegistrationFailed = function(err) {
    // TODO(leah): update this.
    console.error('Unable to register device with push server');
  };

  var handleRegistered = function(e) {
    // This could be skipped by checking whether or not a locally held copy of the id matches that
    // returned on registration. However, due to privacy concerns, the app is intended to record
    // as little information as possible, so just ping the server each time.
    acmAPI.registerDeviceForNotifications(e.regid, function() {
      console.info('registered device with push server');
    }, gcmRegistrationFailed);
  };

  var handleMessage = function(e) {
    var payload = e.payload;
    // Due to the app's simplicity, right now there's no distinction between how messages received
    // in different states are handled. For now, just pull out the most recent action from the
    // message params and cache it.
    // var isColdstart = e.coldstart;
    var isForeground = e.foreground;

    acmPushNotificationHelpers.updateUserDefaults(payload);

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
      if (currentState === 'home') {
        $rootScope.$broadcast('refresh-home-page');
      } else {
        // parameter documentation:
        // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
        window.plugin.notification.local.add({
          id: constants.PUSH_RECEIVED_FOREGROUND_NOTIFICATION_ID,
          title: payload['title'],
          message: payload['message'],
          autoCancel: true
        });
      }
    }
  };

  var handleError = function(e) {
    console.error('GCM error received: ' + e.msg);
    // Deliberately left unhandled for now.
  };

  var handlerLookup = {
    'registered': handleRegistered,
    'message': handleMessage
  };

  return {
    handleNotification: function(e) {
      var eventType = e.event;
      console.log(sprintf('GCM push notification for event "%s" received', eventType));

      // Default to firing the error handler if it's an unrecognized event type.
      (handlerLookup[eventType] || handleError)(e);
    }
  }

};


module.exports = GCMNotificationService;
