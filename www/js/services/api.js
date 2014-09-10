/**
 * Action center API.
 */

var APIService = function ($http, acmDeviceLanguage) {

  return {

    registerDeviceForNotifications: function(deviceId, success, error) {
      var languageSuccess = function(language) {
        var params = {
          'protocol': ionic.Platform.platform().toUpperCase() === 'ANDROID' ? 'GCM' : 'APNS',
          'device_id': deviceId,
          'language': language
        };
        $http.post('http://127.0.0.1:5000/api/1/subscriptions', params).success(success).error(error);
      };

      acmDeviceLanguage.getLanguageCode(languageSuccess);
    }

  };

};

module.exports = APIService;
