/**
 * Gulp file for building and running all ACM tasks.
 */

var bower = require('bower');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var acmUtils = require('./gulp_utils');

var WWW_DIR = path.join(__dirname, 'www');
var RELEASE_DIR = path.join(WWW_DIR, 'release');

var paths = {
  js: ['./www/js/**/*.js'],
  templates: [],
  sass: ['./scss/**/*.scss']
};

var targets = {
  css: path.join(RELEASE_DIR, 'css'),
  js: path.join(RELEASE_DIR, 'js')
};

gulp.task('serve', function () {
  acmUtils.startLiveReload();
  acmUtils.startExpress();
});

gulp.task('sass', function (done) {
  gulp.src('./scss/eff.app.scss')
    .pipe(sass())
    .pipe(gulp.dest(targets.js))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(targets.js))
    .on('end', done);
});

gulp.task('js', function () {
  gulp.src([path.join(WWW_DIR, 'js/app.js')])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    // Bundle to a single file
    .pipe(concat('acm.min.js'))
    // Output it to our dist folder
    .pipe(gulp.dest(path.join(RELEASE_DIR, 'js')));
});

// TODO(leah): Put a watch on the release dir to notify notifyLiveReload
gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('install', function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});
