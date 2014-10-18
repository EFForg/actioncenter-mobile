/**
 * Spin up an express server to serve the app locally.
 */

var express = require('express');
var gulp = require('gulp');

var config = require('../config').server;

gulp.task('runServer', function() {
  var app = express();
  app.use(express.static(config.staticDir));
  app.listen(4000);
});
