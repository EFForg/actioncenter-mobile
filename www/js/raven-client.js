
var angular = require('angular');
var Raven = require('raven-js');
var appSettings = require('../build/app_settings');

var ravenClient;

if (appSettings['CREDENTIALS']['SENTRY_DSN']) {
  ravenClient = Raven.config(appSettings['CREDENTIALS']['SENTRY_DSN'])
    .addPlugin(require('raven-js/plugins/angular'), angular)
    .install();
}

module.exports = ravenClient;
