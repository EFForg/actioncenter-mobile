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

var actionCenterMobile = angular.module('acm', ['ionic', 'acm.controllers', 'acm.services']);

actionCenterMobile.run(function ($ionicPlatform) {
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
});

// TODO(leah): Move the routing to a separate file and update once designs are ready
actionCenterMobile.config(function ($stateProvider, $urlRouterProvider) {
  // TODO(leah): Set up the application routing via AngularUI router
  $stateProvider.state('hat', {});
  // TODO(leah): Define the default page to take the user to if nothing matched
  //  $stateProvider.otherwise('');
});
