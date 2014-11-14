/**
* Copies app assets to the relevant directories.
*/

var gulp = require('gulp');
var gulpChanged = require('gulp-changed');
var path = require('path');

var config = require('../config').assets;

gulp.task('assets', function() {
  gulp.src(config.fontPaths)
    .pipe(gulp.dest(path.join(config.assetsDir, 'fonts')));

  var imgDest = path.join(config.assetsDir, 'img');
  gulp.src(config.imgPaths)
    .pipe(gulpChanged(imgDest))
    .pipe(gulp.dest(imgDest));
});
