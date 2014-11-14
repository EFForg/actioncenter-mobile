/**
 * Main app page, shows the latest action and a share button.
 */

var HomeCtrl = function($scope, acmUserDefaults, acmSharing) {

  /**
   * Object containing the title, description and URL of the latest action.
   * @type {{}}
   */
  $scope.actionInfo = acmUserDefaults.getActionInfo();


  /**
   * Opens the supplied URL in a mobile browser.
   * @param url
   */
  $scope.openURL = function(url) {
    navigator.app.loadUrl(url, {openExternal:true});
  };

  $scope.openShareIntent = function() {
    acmSharing.shareApp('OTHER');
  };

};


module.exports = HomeCtrl;
