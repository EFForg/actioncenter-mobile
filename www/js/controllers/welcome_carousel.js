/**
 * Displays a welcome carousel introducing the app.
 */

var WelcomeCarouselCtrl = function($scope, $state, acmUserDefaults) {

  $scope.slides = [
    'ng_partials/welcome/get_notified.html',
    'ng_partials/welcome/contact_congress.html',
    'ng_partials/welcome/new_projects.html'
  ];

  // Tweak the second slide for non-US users.
  navigator.globalization.getPreferredLanguage(function(language) {
    if (language.value.slice(-2) != 'US') {
      $scope.slides[1] = 'ng_partials/welcome/international.html';
    }
  });

  $scope.openShareAppPage = function() {
    acmUserDefaults.setUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME, true);
    $state.go('acm.post_intro', undefined, {location:'replace'});
  };

};


module.exports = WelcomeCarouselCtrl;
