/**
 * Top level file, referencing all of our controllers
 */

require('../../bower_components/angular/angular.js');

var actionCenterControllers = angular.module('acm.controllers', []);

actionCenterControllers.controller('WelcomeCarouselCtrl', require('./controllers/welcome_carousel'));
