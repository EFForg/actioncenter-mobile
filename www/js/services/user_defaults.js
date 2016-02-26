/**
 * User defaults handler - tracks key / value pairs for user app state.
 */

var UserDefaultsService = function () {

  var userDefaultsPrefix = 'acm.eff';
  var localStorage = window.localStorage;

  var service = {

    keys: Object.freeze({
      USER_HAS_COMPLETED_WELCOME: 'userHasCompletedWelcome',
      DEVICE_LANGUAGE_CODE: 'deviceLanguageCode',
      DEVICE_LANGUAGE_LAST_CHECKED_TIMESTAMP: 'deviceLanguageLastCheckedTimestamp',
      ACTION_TITLE: 'mostRecentActionTitle',
      ACTION: 'mostRecentAction',
      ACTION_URL: 'mostRecentActionURL',
      REGISTERED_FOR_PUSH: 'registeredForPush',
      REGISTERED_DEVICE_ID: 'registeredDeviceId',
      PUSH_ENABLED: 'pushEnabled',
      DELETED_ACTIONS: 'deletedActions'
    }),

    keyLookup: undefined,

    setUserDefault: function (key, val) {
      if (this.keyLookup[key] !== undefined) {
        localStorage.setItem([userDefaultsPrefix, key].join('.'), JSON.stringify(val));
      }
    },

    getUserDefault: function (key) {
      var userDefaultsKey = [userDefaultsPrefix, key].join('.');
      var localValue = localStorage.getItem(userDefaultsKey);
      return localValue === null ? localValue : JSON.parse(localValue);
    },

    getActionInfo: function () {
      var shareSettings = require('../../build/app_settings')['SHARING'];
      return {
        title: this.getUserDefault(this.keys.ACTION_TITLE),
        action: this.getUserDefault(this.keys.ACTION) || shareSettings['TEXT'],
        url: this.getUserDefault(this.keys.ACTION_URL)
      };
    },

    hasReceivedAction: function () {
      return this.getUserDefault(this.keys.ACTION) !== null;
    }

  };

  // Configure the keyLookup object before passing back the service
  var keyLookup = {};
  for (var property in service.keys) {
    if (service.keys.hasOwnProperty(property)) {
      keyLookup[service.keys[property]] = property;
    }
  }
  service.keyLookup = Object.freeze(keyLookup);

  return service;
};

module.exports = UserDefaultsService;
