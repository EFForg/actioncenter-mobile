/**
 * Patches config settings from the config dir to a .js object usable by browserify.
 */

var gulp = require('gulp');
var gulpFile = require('gulp-file');

var config = require('../config').appSettings;

gulp.task('appSettings', function() {
  var appConfig = require('config');

  var constants = {};
  for (var i = 0, constant; i < config.settingsKeys.length; ++i) {
    constant = config.settingsKeys[i];
    constants[constant] = appConfig.get(constant);
  }

  var output = 'module.exports = ' + JSON.stringify(constants) + ';\n\n';

  gulpFile(config.fileName, output)
    .pipe(gulp.dest(config.dest));
});
