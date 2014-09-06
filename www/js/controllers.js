/**
 * Top level file, referencing all of our controllers
 */

require('../../bower_components/angular/angular.js');

var actionCenterControllers = angular.module('acm.controllers', ['acm.services']);

actionCenterControllers.controller('WelcomeCarouselCtrl', require('./controllers/welcome_carousel'));
actionCenterControllers.controller('ShareAppCtrl', require('./controllers/share_app'));
actionCenterControllers.controller('HomeCtrl', require('./controllers/home'));
