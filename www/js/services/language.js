/**
 * Fetcher service for retrievint the Alpha2 country code for a device.
 */

var DeviceLanguageCodeService = function (acmUserDefaults) {

  var DEFAULT_LANGUAGE_CODE = 'en-US';
  var CHECK_DELTA = 60 * 60 * 6; // 6 hours

  return {

    getLanguageCode: function(success) {

      var language = acmUserDefaults.getUserDefault(acmUserDefaults.keys.DEVICE_LANGUAGE_CODE);
      var lastChecked = acmUserDefaults.getUserDefault(
        acmUserDefaults.keys.DEVICE_LANGUAGE_LAST_CHECKED_TIMESTAMP);
      var timestamp = Date.now() / 1000;

      if (language && (lastChecked + CHECK_DELTA) >= timestamp) {
        success(language);
      } else {
        navigator.globalization.getPreferredLanguage(
          function (languageObj) {
            // NOTE: on some Android devices, especially older ones, the value returned here is
            // not guaranteed to be well-formed, see the following for some discussion of this:
            //   * https://github.com/apache/cordova-plugin-globalization/blob/master/doc/index.md
            //
            // Additionally, iOS 8 is planned to support any language, and it's unclear how Cordova
            // will handle this.
            //
            // Given the initial (and foreseen) versions of this app are slim and target
            // a primarily english speaking population, make a basic attempt to capture language
            // preferences, but err on the side of a US-centric, but easy implementation.
            //
            // This approach * DOES NOT * guarantee that the sourced language codes will be well
            // formatted BCP47 codes on either Android or iOS.

            var language = languageObj.value;

            if (typeof language !== 'string' || !(language instanceof String)) {
              language = DEFAULT_LANGUAGE_CODE;
            }

            if (language.length > 20) {
              language = DEFAULT_LANGUAGE_CODE;
            }

            acmUserDefaults.setUserDefault(
              acmUserDefaults.keys.DEVICE_LANGUAGE_LAST_CHECKED_TIMESTAMP, Date.now() / 1000);
            acmUserDefaults.setUserDefault(acmUserDefaults.keys.DEVICE_LANGUAGE_CODE, language);

            success(language);
          },
          function () {
            console.error('Unable to retrieve device language');
            return DEFAULT_LANGUAGE_CODE;
          }
        );
      }
    }

  };

};

module.exports = DeviceLanguageCodeService;
