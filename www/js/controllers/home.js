/**
 * Controller for the home page.
 */

var HomeCtrl = function($scope, acmUserDefaults, acmSharing) {
  $scope.latestAction = acmUserDefaults.getUserDefault(acmUserDefaults.keys.MOST_RECENT_ACTION);

  $scope.openShareIntent = function() {
    acmSharing.shareApp('OTHER');
  };
};

module.exports = HomeCtrl;
