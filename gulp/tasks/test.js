/**
 * Runs mocha tests for the app.
 */

var gulp = require('gulp');
var karma = require('karma').server;

var config = require('../config').test;

gulp.task('test', ['build'], function(done) {

  karma.start(config.karma, function(exitCode) {
    done();
  });

});
