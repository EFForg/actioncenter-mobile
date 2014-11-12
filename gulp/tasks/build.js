var gulp = require('gulp');

gulp.task('build', ['appSettings', 'jsLibs', 'ngTemplates', 'templates', 'browserify', 'sass']);
