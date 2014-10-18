var gulp = require('gulp');

gulp.task('build', ['jsLibs', 'ngTemplates', 'templates', 'browserify', 'sass']);
