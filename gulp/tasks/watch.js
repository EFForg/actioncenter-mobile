var gulp  = require('gulp');
var config = require('../config');

gulp.task('watch', ['runServer', 'setWatch', 'browserSync'], function() {
  gulp.watch(config.sass.paths, ['sass']);

  var templatesPaths = [config.templates.index].concat(config.templates.paths);
  gulp.watch(templatesPaths, ['templates', 'ngTemplates']);

  var assetsPaths = config.assets.imgPaths.concat(config.assets.fontPaths);
  gulp.watch(assetsPaths, ['assets']);
});
