/**
 * Produce CSS files from our source SASS.
 */

var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var sass = require('gulp-sass');

var handleErrors = require('../util/handle_errors');
var config = require('../config').sass;

gulp.task('sass', ['assets'], function () {

  return gulp.src(config.entry)
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(gulpRename('eff.min.css'))
    .pipe(gulp.dest(config.dest));

});
