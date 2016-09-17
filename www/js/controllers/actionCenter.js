/**
 * Parent controller.
 */

var ActionCenterCtrl = function ($scope, $ionicPopover, acmPushNotification, acmPushNotificationHelpers, acmUserDefaults) {
  $scope.preferences = {};
  $scope.preferences.pushNotificationsEnabled = acmUserDefaults.getUserDefault(acmUserDefaults.keys.PUSH_ENABLED) !== false;

  $ionicPopover.fromTemplateUrl('templates/optionsPopover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

  $scope.goToUrl = function (url) {
    window.open(url, '_system', 'location=yes');
  };

  $scope.openOptionsPopover = function ($event) {
    $scope.popover.show($event);
  };

  $scope.togglePushNotifications = function () {
    acmUserDefaults.setUserDefault(acmUserDefaults.keys.PUSH_ENABLED, $scope.preferences.pushNotificationsEnabled);
    var deviceId = acmUserDefaults.getUserDefault(acmUserDefaults.keys.REGISTERED_DEVICE_ID);
    if (!$scope.preferences.pushNotificationsEnabled && deviceId) {
      acmPushNotificationHelpers.unregisterDeviceId(deviceId);
    }
    else {
      acmPushNotification.register();
    }
  };

};

module.exports = ActionCenterCtrl;
