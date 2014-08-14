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
  var appStates = [
    {name: 'welcome', url: '/welcome', templateUrl: 'welcome/welcome_carousel.html', controller: 'WelcomeCarouselCtrl'},
    {name: 'share', url: '/share', templateUrl: 'share_app.html', controller: 'ShareAppCtrl'}
  ];

  for (var i = 0, len = appStates.length; i < len; i++) {
    $stateProvider.state(appStates[i]);
  }

  $urlRouterProvider.otherwise('/welcome');
});

actionCenterMobile.run(function ($state, $ionicPlatform, acmUserDefaults) {

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

  if (acmUserDefaults.getUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME)) {
    $state.transitionTo('share');
  } else {
    $state.transitionTo('welcome');
  }
});
