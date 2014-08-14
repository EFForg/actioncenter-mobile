/**
 * Top level file referencing all of our services.
 */

require('../../bower_components/angular/angular.js');

var actionCenterServices = angular.module('acm.services', []);

actionCenterServices.factory('acmUserDefaults', require('./services/user_defaults'));
actionCenterServices.factory('acmPushNotificationService', require('./services/push'));

// TODO(leah): Figure out what the appropriate exports target is here.
