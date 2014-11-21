var gulp = require('gulp');

gulp.task('build', ['assets', 'appSettings', 'jsLibs', 'ngTemplates', 'templates', 'browserify', 'sass']);
