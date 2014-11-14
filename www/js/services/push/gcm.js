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
    var payload = e.payload;
    // Right now there's no distinction between how messages received in different states are
    // handled. For now, just pull out the most recent action from the message params and cache it.
    var isForeground = e.foreground;

    // TODO(leah): coldstart?

    acmPushNotificationHelpers.updateUserDefaults(payload);

    var currentState = $state.current.name;
    if (isForeground) {
      var message = payload['message'];
      message = message.length > 140 ? message.substring(0, 136) + ' ...' : message;

      // parameter documentation:
      // https://github.com/katzer/cordova-plugin-local-notifications#further-informations-1
      window.plugin.notification.local.add({
        id: constants.PUSH_RECEIVED_FOREGROUND_NOTIFICATION_ID,
        title: payload['title'],
        message: message,
        autoCancel: true
      });
    } else {
      // If the app is backgrounded, any push notification received redirects the user to the action
      // page, updated for the most recent action, irrespective of whether they've completed the
      // welcome carousel etc.
      if (currentState !== 'home') {
        $state.go('home');
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
