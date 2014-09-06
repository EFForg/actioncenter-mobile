/**
 * Simple controller wrapping the welcome carousel.
 */

var WelcomeCarouselCtrl = function($scope, $state, acmUserDefaults) {

  $scope.slides = [
    'welcome/get_notified.html',
    'welcome/contact_congress.html',
    'welcome/new_projects.html'
  ];

  $scope.openShareAppPage = function() {
    acmUserDefaults.setUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME, true);
    $state.transitionTo('post_intro');
  };

};

module.exports = WelcomeCarouselCtrl;
