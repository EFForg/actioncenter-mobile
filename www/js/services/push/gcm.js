/**
 * Helpers and utils for working with GCM push.
 */

var angular = require('angular');

var constants = require('./constants');


var GCMNotificationService = function (
  $state, $cordovaLocalNotifications, acmUserDefaults, acmAPI, acmPushNotificationHelpers) {

  var handleMessage = function (e) {
    var isForeground = e.foreground;

    acmPushNotificationHelpers.updateUserDefaults(e.payload);

    var currentState = $state.current.name;
    if (isForeground) {
      var message = acmUserDefaults.getUserDefault(acmUserDefaults.keys.ACTION);
      message = acmPushNotificationHelpers.truncateString(message, 140);

      // parameter documentation:
      // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
      window.plugin.notification.local.add({
        smallIcon: 'res://notification_icon',
        id: constants.PUSH_RECEIVED_FOREGROUND_NOTIFICATION_ID,
        title: acmUserDefaults.getUserDefault(acmUserDefaults.keys.ACTION_TITLE),
        message: message,
        autoCancel: true
      });
      $state.go('acm.homeTabs.home', {}, {reload: true});
    } else {
      // If the app's backgrounded, any push notification received redirects the user to the action
      // page, updated for the most recent action, irrespective of whether they've completed the
      // welcome carousel.
      $state.go('acm.homeTabs.home', {}, {reload: true});
      // Force-set the has completed welcome flag, to avoid sending the user back to the carousel
      // if they've ever been to the action page via this handler.
      acmUserDefaults.setUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME, true);
    }
  };

  var handlerLookup = {
    'registered': function (e) {
      acmPushNotificationHelpers.registerDeviceId(e.regid);
    },
    'message': handleMessage
  };

  return {
    handleNotification: function (e) {

      var error = function (err) {
        console.error('GCM error received: ' + err.msg);
        // Not a lot that can be done here
      };

      // Default to firing the error handler if it's an unrecognized event type.
      (handlerLookup[e.event] || error)(e);
    },

    registrationSuccess: function (event) {
      // No-op, as the registration is handled via the event interface
      // NOTE: this doesn't actually indicate that the device registered remotely, it will fire even
      //       if the device is in airplane mode etc.
    },

    registrationError: function (err) {
      console.error('Unable to register for GCM push: ' + err);
    }

  };

};


module.exports = GCMNotificationService;
