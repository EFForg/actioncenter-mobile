var gulp = require('gulp');
var merge = require('merge-stream');

var config = require('../config').templates;

gulp.task('templates', function() {
  var index = gulp.src(config.index)
    .pipe(gulp.dest(config.indexDest));

  var templates = gulp.src(config.paths, {base: config.pathsBaseDir})
    .pipe(gulp.dest(config.dest));

  return merge(index, templates);
});
