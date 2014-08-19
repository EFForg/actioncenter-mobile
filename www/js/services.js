/**
 * Top level file referencing all of our services.
 */

require('../../bower_components/angular/angular.js');

var actionCenterServices = angular.module('acm.services', []);

actionCenterServices.factory('acmUserDefaults', require('./services/user_defaults'));
actionCenterServices.factory('acmPushNotification', require('./services/push'));
actionCenterServices.factory('acmAPI', require('./services/api'));
actionCenterServices.factory('acmDeviceLanguage', require('./services/language'));

// TODO(leah): Figure out what the appropriate exports target is here.
