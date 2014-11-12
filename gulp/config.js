/**
 * Gulp task configuration.
 */

var gutil = require('gulp-util');
var path = require('path');

var BASE_DIR = path.join(__dirname, '..');
var COMPONENTS_DIR = path.join(BASE_DIR, 'bower_components');
var WWW_DIR = path.join(BASE_DIR, 'www');
var BUILD_DIR = path.join(WWW_DIR, 'build');
var DIST_DIR = path.join(WWW_DIR, 'dist');
var COMPONENTS_DIR = path.join(BASE_DIR, 'bower_components');

var SERVER_PORT = 4000;

module.exports = {

  appSettings: {
    dest: BUILD_DIR,
    fileName: 'app_settings.js',
    settingsKeys: [
      'API',
      'APP',
      'CREDENTIALS'
    ]
  },

  assets: {
    dest: DIST_DIR,
    assetsDir: path.join(DIST_DIR, 'assets'),
    fontPaths: [
      path.join(COMPONENTS_DIR, 'open-sans-fontface/fonts', 'Light/*'),
      path.join(COMPONENTS_DIR, 'open-sans-fontface/fonts', 'Regular/*'),
      path.join(COMPONENTS_DIR, 'open-sans-fontface/fonts', 'Bold/*'),
      path.join(COMPONENTS_DIR, 'ionic/fonts/*')
    ],
    imgPaths: [
      path.join(WWW_DIR, 'img/**/*')
    ]
  },

  browserify: {
    debug: !gutil.env.production,
    entries: ['./www/js/app.js'],
    dest: path.join(DIST_DIR, 'js'),
    outputName: 'acm.min.js'
  },

  browserSync: {
    proxy: 'http://127.0.0.1:' + SERVER_PORT,
    port: SERVER_PORT + 1,
    files: [
      path.join(DIST_DIR, '/**/*'),
      '!' + path.join(DIST_DIR, '/**.map')
    ]
  },

  jsLibs: {
    distDir: path.join(DIST_DIR, 'js'),
    jsLibs: [
      path.join(COMPONENTS_DIR, 'angular/angular.js'),
      path.join(COMPONENTS_DIR, 'angular-animate/angular-animate.js'),
      path.join(COMPONENTS_DIR, 'angular-sanitize/angular-sanitize.js'),
      path.join(COMPONENTS_DIR, 'angular-ui-router/release/angular-ui-router.js'),
      path.join(COMPONENTS_DIR, 'ionic/js/ionic.js'),
      path.join(COMPONENTS_DIR, 'ionic/js/ionic-angular.js'),
      path.join(COMPONENTS_DIR, 'ngCordova/dist/ng-cordova.js'),
      path.join(COMPONENTS_DIR, 'sprintf/src/sprintf.js')
    ]
  },

  ngTemplates: {
    dest: BUILD_DIR,
    paths: [
      path.join(WWW_DIR, 'templates/**/*.html')
    ],
    fileRoot: 'ng_partials',
    ngModuleName: 'acm',
    templateFileName: 'acmTemplates.js',
    moduleSystem: 'browserify'
  },

  sass: {
    entry: path.join(BASE_DIR, 'scss/eff.app.scss'),
    dest: path.join(DIST_DIR, 'css'),
    paths: path.join(BASE_DIR, 'scss/*.scss')
  },

  server: {
    port: SERVER_PORT,
    staticDir: DIST_DIR
  },

  templates: {
    index: path.join(WWW_DIR, 'index.html'),
    indexDest: DIST_DIR,
    dest: path.join(DIST_DIR, 'templates'),
    // Paths is a little more complex here, as it's doing a recursive copy relative to a base dir
    paths: [path.join(WWW_DIR, 'templates/**/*.html')],
    pathsBaseDir: path.join(WWW_DIR, 'templates')
  }

};
