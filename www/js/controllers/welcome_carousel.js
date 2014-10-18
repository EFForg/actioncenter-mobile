/**
 * Simple controller wrapping the welcome carousel.
 */

var WelcomeCarouselCtrl = function($scope, $state, acmUserDefaults) {

  $scope.slides = [
    'ng_partials/welcome/get_notified.html',
    'ng_partials/welcome/contact_congress.html',
    'ng_partials/welcome/new_projects.html'
  ];

  $scope.openShareAppPage = function() {
    acmUserDefaults.setUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME, true);
    $state.go('post_intro', undefined, {location:'replace'});
  };

};

module.exports = WelcomeCarouselCtrl;
