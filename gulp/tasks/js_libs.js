var concat = require('gulp-concat');
var gulp = require('gulp');

var config = require('../config').jsLibs;

gulp.task('jsLibs', function() {
   gulp.src(config.jsLibs)
      .pipe(concat('libs.min.js'))
      .pipe(gulp.dest(config.distDir));
});
