/**
 * Fetcher service for retrievint the Alpha2 country code for a device.
 */

var DeviceLanguageCodeService = function (acmUserDefaults) {

  var DEFAULT_LANGUAGE_CODE = 'en-US';
  var CHECK_DELTA = 60 * 60 * 6; // 6 hours

  return {

    getLanguageCode: function (success) {

      var language = acmUserDefaults.getUserDefault(acmUserDefaults.keys.DEVICE_LANGUAGE_CODE);
      var lastChecked = acmUserDefaults.getUserDefault(
        acmUserDefaults.keys.DEVICE_LANGUAGE_LAST_CHECKED_TIMESTAMP);
      var timestamp = Date.now() / 1000;

      if (language && (lastChecked + CHECK_DELTA) >= timestamp) {
        success(language);
      } else {
        var language = navigator.language;

        if (typeof language !== 'string') {
          language = DEFAULT_LANGUAGE_CODE;
        }

        if (language.length > 20) {
          language = DEFAULT_LANGUAGE_CODE;
        }

        acmUserDefaults.setUserDefault(
          acmUserDefaults.keys.DEVICE_LANGUAGE_LAST_CHECKED_TIMESTAMP, Date.now() / 1000);
        acmUserDefaults.setUserDefault(acmUserDefaults.keys.DEVICE_LANGUAGE_CODE, language);

        success(language);
      }
    }

  };

};

module.exports = DeviceLanguageCodeService;
