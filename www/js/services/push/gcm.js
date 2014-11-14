/**
 * Helpers and utils for working with GCM push.
 */

var angular = require('angular');
var sprintf = require('sprintf');

var appSettings = require('../../../build/app_settings');
var constants = require('./constants');


var GCMNotificationService = function(
  $state, $cordovaLocalNotification, acmUserDefaults, acmAPI, acmPushNotificationHelpers) {

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
    var isForeground = e.foreground;

    acmPushNotificationHelpers.updateUserDefaults(e.payload);

    var currentState = $state.current.name;
    if (isForeground) {
      var message = acmUserDefaults.getUserDefault(acmUserDefaults.keys.ACTION);
      message = message.length > 140 ? message.substring(0, 136) + ' ...' : message;

      // parameter documentation:
      // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
      window.plugin.notification.local.add({
        icon: 'notification_icon',
        id: constants.PUSH_RECEIVED_FOREGROUND_NOTIFICATION_ID,
        title: acmUserDefaults.getUserDefault(acmUserDefaults.keys.ACTION_TITLE),
        message: message,
        autoCancel: true
      });
    } else {
      // If the app's backgrounded, any push notification received redirects the user to the action
      // page, updated for the most recent action, irrespective of whether they've completed the
      // welcome carousel.
      if (currentState !== 'home') {
        // Force-set the has completed welcome flag, to avoid sending the user back to the carousel
        // if they've ever been to the action page via this handler.
        acmUserDefaults.setUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME, true);
        $state.go('home');
      }
    }
  };

  var handleError = function(e) {
    console.error('GCM error received: ' + e.msg);
    // Not a lot that can be done here
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
