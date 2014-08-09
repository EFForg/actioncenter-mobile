/**
 * Push notification handler.
 *
 * Requires that the Cordova push plugin has been installed:
 *   cordova plugin add https://github.com/phonegap-build/PushPlugin.git
 */

// TODOs:
//   * token handler - callback to notify push server re. the device token
//   * error handler
//   * token reaping
//   * success handler for GCM
//   * error handler for both APNS and GCM
//   * decide if this should actually be one service, or if should just have a standard interface but be two.

var PushNotificationService = function (acmDevicePlatformService) {

  var handleAPNSNotification = function (event) {
    var pushNotification = window.plugins.pushNotification;

    // TODO(leah): Handle the alert / badge / sound
  };

  var handleGCMNotification = function (event) {
    var eventType = e.event;

    if (eventType ==='registered') {
      // TODO(leah): Notify the server re. the regID for the device.
      var registrationId = e.regid;
    } else if (eventType === 'message') {
      // TODO(leah): Parse the message.
    } else if (eventType === 'error') {
      console.error('GCM error received: ' + e.msg);
      // TODO(leah): Decide whether to swallow the error or show a notification.
    } else {
      console.error('An unknown GCM event has occurred');
    }
  };

  return {
    registerForAPNSNotifications: function() {
      pushNotification.register(
        function() {}, // Token handler
        function() {}, // Error handler
        {
          "badge": "true",
          "sound": "true",
          "alert": "true",
          "ecb": "" // TODO(leah): configure the event callback, it's a little annoying it needs to be a string
        });
    },

    registerForGCMNotifications: function() {
      pushNotification.register(
        function() {}, // Success handler
        function() {}, // Error handler
        {
          "senderID": "TODO",
          "ecb": "" // TODO(leah): configure the event callback, it's a little annoying it needs to be a string
        });
    },

    pushRegistrationSuccess: function (result) {
      console.info(
          'Push registration for ' + acmDevicePlatformService.getDevicePlatform() + ' succeeded with: ' + result);
    },

    pushRegistrationFailed: function (error) {
      console.error(
          'Push registration for ' + acmDevicePlatformService.getDevicePlatform() + ' failed with error: ' + error);
      // TODO(leah): Notify the user that there was an error.
    }
  };
};

module.exports = PushNotificationService;
