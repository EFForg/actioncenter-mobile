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

  var service = {

    /**
     * Register the device with the notification backend.
     */
    register: function() {
      var pushConfig = appSettings['CREDENTIALS'][ionic.Platform.platform().toUpperCase()];
      pushConfig['ecb'] = 'pushNotificationEventBus';
      $cordovaPush.register(pushConfig).then(registrationSuccess, registrationError);

      window.plugin.notification.local.onclick = function(id, state, json) {
        if (id === pushConstants.PUSH_RECEIVED_FOREGROUND_NOTIFICATION_ID) {
          $state.go('home');
        }
      };
    },

    /**
     * Top level handler for push notifications on all platforms.
     *
     * @param {*} event The push notification event.
     */
    handlePushNotification: function(event) {
      var devicePlatform = ionic.Platform.platform().toUpperCase();
      if (devicePlatform === 'ANDROID') {
        acmGCMPushNotification.handleNotification(event);
      } else if (devicePlatform === 'IOS') {

      }
    }

  };

  /**
   * Listen to push notification events from the event bus.
   */
  $rootScope.$on('push-notification', function(event, pushEvent) {
    service.handlePushNotification(pushEvent);
  });

  return service;
};

module.exports = PushNotificationService;
