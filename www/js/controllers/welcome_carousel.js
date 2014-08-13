/**
 * Simple controller wrapping the welcome carousel.
 */

var WelcomeCarouselCtrl = function($scope) {

  $scope.slides = [
    'welcome/get_notified.html',
    'welcome/contact_congress.html',
    'welcome/new_projects.html'
  ];

};

module.exports = WelcomeCarouselCtrl;
