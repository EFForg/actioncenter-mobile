/**
 * Displays miscellaneous extra things.
 *
 */

var MoreCtrl = function($scope) {

  $scope.showAbout = false;
  $scope.showSocial = false;

  $scope.toggleAbout = function(){
    $scope.showAbout = !$scope.showAbout;
  };

  $scope.toggleSocial = function(){
    $scope.showSocial = !$scope.showSocial;
  };

};

module.exports = MoreCtrl;
