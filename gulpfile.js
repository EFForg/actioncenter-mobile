/**
 * Gulp file for building and running all ACM tasks.
 */

var bower = require('bower');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpIf = require('gulp-if');
var gulpInsert = require('gulp-insert');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var ngTemplates = require('gulp-angular-templatecache');
var path = require('path');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

var acmUtils = require('./gulp_utils');

var WWW_DIR = path.join(__dirname, 'www');
var RELEASE_DIR = path.join(WWW_DIR, 'release');
var COMPONENTS_DIR = path.join(__dirname, 'bower_components');

var paths = {
  assets: [path.join(WWW_DIR, 'index.html')],
  js: [path.join(WWW_DIR, 'js/**/*.js')],
  sass: ['./scss/**/*.scss'],
  templates: [path.join(WWW_DIR, 'templates/**/*.html')]
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
    // TODO(leah): Update this to read off an "is prod variable"
    .pipe(gulpIf(false, minifyCss({
      keepSpecialComments: 0
    })))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(targets.css))
    .on('end', done);
});

gulp.task('assets', function() {
  // Copy the index.html file to the root of the release dir, so that express can serve it
  gulp.src([path.join(WWW_DIR, 'index.html')])
    .pipe(gulp.dest(RELEASE_DIR));

  // Copy over all of the required fonts
  var fontsDir = path.join(RELEASE_DIR, 'assets/fonts');
  var openSansFonts = path.join(COMPONENTS_DIR, 'open-sans-fontface/fonts');
  gulp.src([path.join(openSansFonts, 'Light/*'), path.join(openSansFonts, 'Regular/*'), path.join(openSansFonts, 'Bold/*')])
    .pipe(gulp.dest(fontsDir));

  gulp.src([path.join(COMPONENTS_DIR, 'ionic/fonts/*')])
    .pipe(gulp.dest(fontsDir));
});

gulp.task('templates', function() {
  console.log('Compiling ng templates to a templates file');
  // This is a bit hacky - it sets up required boilerplate to use the templates as a separate module
  var templatesPrepend = 'require("../../../bower_components/angular/angular.js");\n' +
    'var acmTemplates = angular.module("acm.templates", []);\n';
  gulp.src(paths.templates)
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(ngTemplates('templates.js', {'module': 'acm.templates'}))
    .pipe(gulpInsert.prepend(templatesPrepend))
    .pipe(gulp.dest(path.join(WWW_DIR, 'js/templates')));
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

gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['lint', 'js']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.assets, ['assets']);

  gulp.watch(path.join(WWW_DIR, 'release/*/**'), acmUtils.notifyLiveReload);
});

gulp.task('bower', function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('default', ['assets', 'templates', 'js', 'sass', 'serve']);
