/**
 * Top level gulpfile - imports all tasks under gulp/tasks
 */

var argv = process.argv;
if (argv[argv.length - 1] === 'test') {
  process.env.NODE_ENV = 'test';
}

var requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});
