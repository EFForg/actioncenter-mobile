
var gulp = require('gulp');
var run = require('gulp-run');

var runOnDevice = function(platform) {
  var cmd = 'ionic run ' + platform;
  run(cmd).exec();
};

gulp.task('runAndroid', ['build'], function() {
  runOnDevice('android');
});

gulp.task('runIos', ['build'], function() {
  runOnDevice('ios');
});
