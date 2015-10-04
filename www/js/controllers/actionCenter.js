/**
 * Parent controller.
 */

var ActionCenterCtrl = function($scope) {

  $scope.goToUrl = function(url) {
    window.open(url, '_system', 'location=yes');
  }

};

module.exports = ActionCenterCtrl;
