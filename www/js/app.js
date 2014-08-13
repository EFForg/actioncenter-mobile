/**
 * Primary application target, defines top level module and imports required files.
 */

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-animate/angular-animate.js');
require('../../bower_components/angular-sanitize/angular-sanitize.js');
require('../../bower_components/angular-ui-router/release/angular-ui-router.js');
require('../../bower_components/ionic/js/ionic.js');
require('../../bower_components/ionic/js/ionic-angular.js');

require('./controllers');
require('./services');
require('./templates/templates');

var actionCenterMobile = angular.module('acm', ['ionic', 'acm.templates', 'acm.controllers', 'acm.services']);

// TODO(leah): Move the routing to a separate file and update once designs are ready
actionCenterMobile.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state(
    {name: 'welcome', url: 'welcome', templateUrl: 'welcome_carousel.html', controller: 'WelcomeCarouselCtrl'}
  );

  // TODO(leah): Define the default page to take the user to if nothing matched
  //  $stateProvider.otherwise('');
});

actionCenterMobile.run(function ($state, $ionicPlatform, $rootScope, $templateCache) {

  $ionicPlatform.ready(function () {

    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Requires org.apache.cordova.statusbar
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

  });

  // TODO(leah): Update this to make it conditional
  $state.transitionTo('welcome');
});
