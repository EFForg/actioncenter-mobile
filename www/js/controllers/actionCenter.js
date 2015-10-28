/**
 * Parent controller.
 */

var ActionCenterCtrl = function($scope, $ionicPopover) {

  $ionicPopover.fromTemplateUrl('templates/optionsPopover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.goToUrl = function(url) {
    window.open(url, '_system', 'location=yes');
  }

  $scope.openOptionsPopover = function($event){
    $scope.popover.show($event);
  }

};

module.exports = ActionCenterCtrl;
