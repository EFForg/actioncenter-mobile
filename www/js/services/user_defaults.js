/**
 * User defaults handler - tracks key / value pairs for user app state.
 */

var UserDefaultsService = function () {

  var userDefaultsPrefix = 'acm.eff';
  var localStorage = window.localStorage;

  var serviceImplementation = {

    keys: Object.freeze({
      USER_HAS_COMPLETED_WELCOME: 'userHasCompletedWelcome',
      DEVICE_LANGUAGE_CODE: 'deviceLanguageCode',
      DEVICE_LANGUAGE_LAST_CHECKED_TIMESTAMP: 'deviceLanguageLastCheckedTimestamp'
    }),

    keyLookup: undefined,

    setUserDefault: function(key, val) {
      if (this.keyLookup[key] !== undefined) {
        localStorage.setItem([userDefaultsPrefix, key].join('.'), JSON.stringify(val));
      }
    },

    getUserDefault: function(key) {
      var userDefaultsKey = [userDefaultsPrefix, key].join('.');
      var localValue = localStorage.getItem(userDefaultsKey);
      return localValue === null ? localValue : JSON.parse(localValue);
    }

  };

  var keyLookup = {};
  for (var property in serviceImplementation.keys) {
    if (serviceImplementation.keys.hasOwnProperty(property)) {
      keyLookup[serviceImplementation.keys[property]] = property;
    }
  }
  serviceImplementation.keyLookup = Object.freeze(keyLookup);

  return serviceImplementation;
};

module.exports = UserDefaultsService;
