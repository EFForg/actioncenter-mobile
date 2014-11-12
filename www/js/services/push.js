/**
 * Push notification handler.
 *
 * Requires that the Cordova push plugin has been installed:
 *   cordova plugin add https://github.com/phonegap-build/PushPlugin.git
 */

var appSettings = require('../../build/app_settings');
var pushConstants = require('./push/constants');


var PushNotificationService = function ($rootScope, $state, $cordovaPush, acmGCMPushNotification) {

  // NOTE: this function will fire even if the device is offline etc., so don't really trust it
  var registrationSuccess = function(result) {
    console.log('Push registration success: ' + result);
  };

  var registrationError = function(error) {
    console.log('Push registration failed: ' + error);
  };

  return {

    register: function() {
      var pushConfig = appSettings['CREDENTIALS'][ionic.Platform.platform().toUpperCase()];
      $cordovaPush.register(pushConfig).then(registrationSuccess, registrationError);

      window.plugin.notification.local.onclick = function(id, state, json) {
        if (id === pushConstants.PUSH_RECEIVED_FOREGROUND_NOTIFICATION_ID) {
          $state.go('home');
        }
      };
    },

    handlePushNotification: function(event) {
      var devicePlatform = ionic.Platform.platform().toUpperCase();
      if (devicePlatform === 'ANDROID') {
        acmGCMPushNotification.handleNotification(event);
      } else if (devicePlatform === 'IOS') {

      }
    }

  };
};

module.exports = PushNotificationService;
