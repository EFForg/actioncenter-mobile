/**
 * Helpers for the channel specific notification handlers.
 */

var angular = require('angular');


var PushHelpersService = function (acmUserDefaults) {

  var defaultsPayloadArr = [
    ['title', acmUserDefaults.keys.ACTION_TITLE],
    ['message', acmUserDefaults.keys.ACTION],
    ['url', acmUserDefaults.keys.ACTION_URL],
  ];
  var defaultsPayloadMap = {};
  angular.forEach(defaultsPayloadArr, function (arr) {
    defaultsPayloadMap[arr[0]] = arr[1];
  });

  return {

    updateUserDefaults: function (payload) {
      angular.forEach(defaultsPayloadMap, function (userDefaultsKey, payloadKey) {
        if (!angular.isUndefined(payload[payloadKey])) {
          console.log('setting ' + userDefaultsKey);
          acmUserDefaults.setUserDefault(userDefaultsKey, payload[payloadKey]);
        }
      });
    },

    registerDeviceId: function (deviceId) {
      console.log("successfully registered, saving device id: " + JSON.stringify(deviceId));
      acmUserDefaults.setUserDefault(acmUserDefaults.keys.REGISTERED_FOR_PUSH, true);
      acmUserDefaults.setUserDefault(acmUserDefaults.keys.REGISTERED_DEVICE_ID, deviceId);
    },

    truncateString: function (string, length) {
      var requiresTruncation = string.length > length;

      if (requiresTruncation) {
        var truncatedString = string.substr(0, length - 1);
        return truncatedString.substr(0, truncatedString.lastIndexOf(' ')) + '...';
      }

      return string;
    }

  };

};


module.exports = PushHelpersService;
