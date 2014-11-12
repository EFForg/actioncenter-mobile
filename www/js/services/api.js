/**
 * Action center API.
 */

var sprintf = require('sprintf');

var appSettings = require('../../build/app_settings');


var APIService = function ($http, acmDeviceLanguage) {

  var MAX_RETRIES = 3;

  return {

    registerDeviceForNotifications: function(deviceId, success, error) {

      var registrationAttempts = 0;

      var registerDevice = function(language) {
        var params = {
          'channel': ionic.Platform.platform().toUpperCase() === 'ANDROID' ? 'GCM' : 'APNS',
          'deviceId': deviceId,
          'language': language
        };

        var url = sprintf(
          '%s/%s/subscriptions', appSettings['API']['ENDPOINT'], appSettings['API']['VERSION']);
        $http.post(url, params)
          .success(success)
          .error(function(data, status, headers, config) {
            registrationAttempts++;
            if (registrationAttempts < MAX_RETRIES) {
              setTimeout(function() {
                registerDevice(language);
              }, 1000);
            } else {
              error(data, status, headers, config);
            }
          });
      };

      // NOTE: this returns default en-US if it's unable to get the device's language
      acmDeviceLanguage.getLanguageCode(registerDevice);
    }

  };

};

module.exports = APIService;
