/**
 * Helpers and utils for working with APNS push.
 */

var angular = require('angular');


var APNSNotificationService = function($state, $cordovaPush, acmPushNotificationHelpers) {

  var displayNotification = function(alert) {
    navigator.notification.alert(alert);
  };

  var playNotificationSound = function(sound) {
    var sound = new Media(sound);
    sound.play();
  };

  var setApplicationBadge = function(badge) {
    var error = function(err) {
      console.log('unable to set the notification badge: ' + err);
    };
    $cordovaPush.setApplicationIconBadgeNumber(angular.noop, error, badge);
  };

  var handlerLookup = {
    'alert': displayNotification,
    'sound': playNotificationSound,
    'badge': setApplicationBadge
  };

  return {

    handleNotification: function(notification) {

      var isInForeground = notification.foreground === '1';
      // The notification object gets flattened to a single dict by the push plugin.
      acmPushNotificationHelpers.updateUserDefaults(notification);

      if (isInForeground) {
        $state.go('home', {}, {reload: true});
      } else {
        angular.forEach(handlerLookup, function(handler, key) {
          if (!angular.isUndefined(notification[key])) {
            handler(notification[key]);
          }
        });
      }

    },

    registrationSuccess: function(registrationId) {
      acmPushNotificationHelpers.registerDeviceId(registrationId);
    },

    registrationError: function(err) {
      console.log('Push registration failed: ' + err);
    }
  }

};


module.exports = APNSNotificationService;
