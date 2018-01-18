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
    if (!$scope.preferences.pushNotificationsEnabled) {
      acmPushNotification.unsubscribe(function() {
        acmUserDefaults.setUserDefault(acmUserDefaults.keys.REGISTERED_FOR_PUSH, false);
      }, function(err) {
        console.error('Unable to unsubscribe from push channel: ' + JSON.stringify(err));
      });
    }
    else {
      acmPushNotification.subscribe(function() {
        acmUserDefaults.setUserDefault(acmUserDefaults.keys.REGISTERED_FOR_PUSH, true);
      }, function(err) {
        console.error('Unable to subscribe to push channel: ' + JSON.stringify(err));
      });
    }
  };

};

module.exports = ActionCenterCtrl;
