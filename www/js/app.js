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

actionCenterMobile.config(function ($stateProvider, $urlRouterProvider) {
  var appStates = [
    {name: 'welcome', url: '/welcome', templateUrl: 'welcome/welcome_carousel.html', controller: 'WelcomeCarouselCtrl'},
    {name: 'post_intro', url: '/post_intro', templateUrl: 'post_intro.html', controller: 'ShareAppCtrl'},
    {name: 'share_app', url: '/share_app', templateUrl: 'post_intro.html', controller: 'ShareAppCtrl'},
    {name: 'home', url: '/home', templateUrl: 'home.html', controller: 'HomeCtrl'}
  ];

  for (var i = 0, len = appStates.length; i < len; i++) {
    $stateProvider.state(appStates[i]);
  }

  // NOTE: no otherwise is specified for routing, because:
  //  * the user shouldn't be able to get to any non-standard routes
  //  * it causes a load of the page by default prior to the routing logic in run() kicking in
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

    if (window.plugins !== undefined) {
      acmPushNotification.register();
    }

    // NOTE: this is delayed until post-ready as some plugins are not available otherwise (e.g.
    //       appAvailability) and cause problems if accessed.
    var completedWelcome = acmUserDefaults.getUserDefault(
      acmUserDefaults.keys.USER_HAS_COMPLETED_WELCOME);
    var hasReceivedActionPush = acmUserDefaults.getUserDefault(
      acmUserDefaults.keys.MOST_RECENT_ACTION) !== null;

    if (completedWelcome) {
      $state.go(hasReceivedActionPush ? 'home' : 'post_intro');
    } else {
      $state.go('welcome');
    }
  });
});
