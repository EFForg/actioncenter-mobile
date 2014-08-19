/**
 * Primary application target, defines top level module and imports required files.
 */

require('../../bower_components/angular/angular.js');
require('../../bower_components/angular-animate/angular-animate.js');
require('../../bower_components/angular-sanitize/angular-sanitize.js');
require('../../bower_components/angular-ui-router/release/angular-ui-router.js');
require('../../bower_components/ionic/js/ionic.js');
require('../../bower_components/ionic/js/ionic-angular.js');
require('../../bower_components/ngCordova/dist/ng-cordova.js');
require('../../bower_components/sprintf/src/sprintf.js'); // Using /src as /dist doesn't contain unminified code

require('./controllers');
require('./services');
require('./templates/templates');

// Registered here so it's in a context that stringByEvaluatingJavaScriptFromString can pick up on.
pushNotificationEventBus = function(event) {
  var pushService = angular.element(document.querySelector('body')).injector().get(
    'acmPushNotification');
  pushService.handlePushNotification(event);
};


var actionCenterMobile = angular.module(
  'acm', ['ionic', 'ngCordova', 'acm.templates', 'acm.controllers', 'acm.services']);

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

actionCenterMobile.run(function ($state, $ionicPlatform, acmPushNotification, acmUserDefaults) {

  $ionicPlatform.ready(function () {

    // Hide the accessory bar by default
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    // Requires org.apache.cordova.statusbar
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    acmPushNotification.register();
  });

  if (acmUserDefaults.getUserDefault(acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME)) {
    $state.transitionTo('share');
  } else {
    $state.transitionTo('welcome');
  }
});
