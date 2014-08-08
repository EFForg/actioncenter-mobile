/**
 * Top level file referencing all of our services.
 */

var actionCenterServices = angular.module('acm.services', []);

actionCenterServices.service('PushNotificationService', require('./services/push'));

// TODO(leah): Figure out what the appropriate exports target is here.