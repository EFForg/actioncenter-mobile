/**
 * Controller for the home page.
 */

var HomeCtrl = function($scope, acmUserDefaults) {
  $scope.latestAction = acmUserDefaults.getUserDefault(acmUserDefaults.keys.MOST_RECENT_ACTION);
};

module.exports = HomeCtrl;
