/**
 * Gulp file for building and running all ACM tasks.
 */

var bower = require('bower');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
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

gulp.task('serve', ['watch'], function() {
  acmUtils.startExpress();
  acmUtils.startLiveReload();
});

gulp.task('sass', function (done) {
  console.log('Compiling ACM SASS files');
  gulp.src('./scss/eff.app.scss')
    .pipe(sass(gutil.log))
    .pipe(concat('eff.css'))
    .pipe(sass())
    .pipe(gulp.dest(targets.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(targets.css))
    .on('end', done);
});

gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function () {
  console.log('Compiling ACM JS files');
  gulp.src([path.join(WWW_DIR, 'js/app.js')])
    .on('error', gutil.log)
    .pipe(browserify({
      insertGlobals: true,
      debug: !gutil.env.production
    }))
    // Bundle to a single file and output to the release dir
    .pipe(concat('acm.min.js'))
    .pipe(gulp.dest(path.join(RELEASE_DIR, 'js')));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['lint', 'js']);

  gulp.watch(path.join(WWW_DIR, 'release/*/**'), acmUtils.notifyLiveReload);
});

gulp.task('install', function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});
