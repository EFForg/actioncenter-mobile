/**
 * Main app page, shows the latest action and a share button.
 */

var HomeCtrl = function($scope, acmUserDefaults, acmSharing) {

  /**
   * Object containing the title, description and URL of the latest action.
   * @type {{}}
   */
  $scope.actionInfo = acmUserDefaults.getActionInfo();

  $scope.openShareIntent = function() {
    acmSharing.shareApp('OTHER');
  };

};


module.exports = HomeCtrl;
