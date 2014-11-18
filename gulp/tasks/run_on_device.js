
var gulp = require('gulp');
var run = require('gulp-run');

var runOnDevice = function(platform) {
  var cmd = 'ionic run ' + platform;
  run(cmd).exec();
};

gulp.task('runAndroid', ['build'], function() {
  runOnDevice('android');
});

gulp.task('runIos', function() {
  var output = [
    'To run on iOS, you\'ll need to:',
    '* run "gulp build ; cordova prepare" to copy iOS resources over',
    '* set up XCode with your certificates',
    '* open the app located in platforms/ios in XCode',
    '* test from there'
  ];
  console.log(output.join('\n'));
});
