/**
 *
 */

var angular = require('angular');


var PushHelpersService = function(acmUserDefaults) {

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
          acmUserDefaults.setUserDefault(userDefaultsKey, payload[payloadKey]);
        }
      });
    }
  };

};


module.exports = PushHelpersService;
