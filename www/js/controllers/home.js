/**
 * Main app page, shows the latest action and a share button.
 */

var HomeCtrl = function($scope, acmUserDefaults, acmSharing) {
  $scope.latestAction = acmUserDefaults.getUserDefault(acmUserDefaults.keys.ACTION);

  $scope.openShareIntent = function() {
    acmSharing.shareApp('OTHER');
  };

  $scope.$on('refresh-home-page', function() {
    $scope.latestAction = acmUserDefaults.getUserDefault(acmUserDefaults.keys.ACTION);
    $scope.$apply();
  });

};


module.exports = HomeCtrl;
