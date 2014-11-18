/**
 * Helpers for the channel specific notification handlers.
 */

var angular = require('angular');


var PushHelpersService = function(acmUserDefaults, acmAPI) {

  var defaultsPayloadArr = [
    ['title', acmUserDefaults.keys.ACTION_TITLE],
    ['message', acmUserDefaults.keys.ACTION],
    ['url', acmUserDefaults.keys.ACTION_URL],
  ];
  var defaultsPayloadMap = {};
  angular.forEach(defaultsPayloadArr, function(arr) {
    defaultsPayloadMap[arr[0]] = arr[1];
  });

  return {

    updateUserDefaults: function(payload) {
      angular.forEach(defaultsPayloadMap, function(userDefaultsKey, payloadKey) {
        if (!angular.isUndefined(payload[payloadKey])) {
          console.log('setting ' + userDefaultsKey);
          acmUserDefaults.setUserDefault(userDefaultsKey, payload[payloadKey]);
        }
      });
    },

    registerDeviceId: function(deviceId) {
      var success = function() {
        acmUserDefaults.setUserDefault(acmUserDefaults.REGISTERED_FOR_PUSH, true);
      };

      var error = function(err) {
        console.error('Unable to register device with push server: ' + err);
      };

      // This could be skipped by checking whether or not a locally held copy of the id matches that
      // returned on registration. However, due to privacy concerns, the app is intended to record
      // as little information as possible, so just ping the server each time.
      acmAPI.registerDeviceForNotifications(deviceId, success, error);
    }

  };

};


module.exports = PushHelpersService;
