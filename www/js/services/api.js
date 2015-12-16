/**
 * Action center API.
 */

var angular = require('angular');
var sprintf = require('sprintf');

var appSettings = require('../../build/app_settings');


var APIService = function ($http, acmDeviceLanguage) {

  var MAX_RETRIES = 3;
  // Flat 1.5 second backoff
  var RETRY_BACKOFF = 1500;

  /**
   * Wrapper function to support retrying failing API calls.
   */
  var retryWrapper = function (apiCall, args, success, error) {
    var retryAttempts = 0;
    var wrappedCall = function () {

      apiCall.apply(this, args)
        .success(success)
        .error(function (data, status, headers, config) {
          retryAttempts++;
          if (retryAttempts <= MAX_RETRIES) {
            setTimeout(function () {
              wrappedCall();
            }, RETRY_BACKOFF);
          } else {
            error(data, status, headers, config);
          }
        });

    };

    return wrappedCall;
  };

  return {

    /**
     * Registers a device id with the backend.
     *
     * @param {string} deviceId The id of the device to register (registration_id for GCM etc.)
     * @param success
     * @param error
     */
    registerDeviceForNotifications: function (deviceId, success, error) {

      var registerDevice = function (language) {
        var params = {
          'channel': ionic.Platform.platform().toUpperCase() === 'ANDROID' ? 'GCM' : 'APNS',
          'deviceId': deviceId,
          'language': language
        };

        var url = sprintf(
          '%s/%s/subscriptions', appSettings['API']['ENDPOINT'], appSettings['API']['VERSION']);
        var wrappedCall = retryWrapper($http.post, [url, params], success, error);
        wrappedCall();
      };

      // NOTE: this returns default en-US if it's unable to get the device's language
      acmDeviceLanguage.getLanguageCode(registerDevice);
    },

    /**
     * Sends a stack trace to the backend,
     */
    reportError: function (err) {
      try {
        var url = sprintf(
          '%s/%s/errors', appSettings['API']['ENDPOINT'], appSettings['API']['VERSION']);
        var params = [url, {trace: err.stack}];
        var wrappedCall = retryWrapper($http.post, params, angular.noop, angular.noop);
        wrappedCall();
      } catch (e) {
        // Ignore errors from this function, to avoid a loop
      }
    }

  };

};

module.exports = APIService;
