/**
 * Top level file, referencing all of our controllers
 */

var actionCenterControllers = angular.module('acm.controllers', []);

actionCenterControllers.controller('WelcomeCarouselCtrl', require('./controllers/welcome_carousel'));
