/**
 * Utility functions used by Gulp tasks
 */

var path = require('path');

var LIVERELOAD_PORT = 35729;
var WWW_DIR = path.join(__dirname, 'www');

var startExpress = function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({
    port: LIVERELOAD_PORT
  }));
  app.use(express.static(WWW_DIR));
  app.listen(4000);
};

var tinyLR;
var startLiveReload = function startLiveReload() {
  tinyLR = require('tiny-lr')();
  tinyLR.listen(LIVERELOAD_PORT);
};

var notifyLivereload = function(event) {
  var fileName = path.relative(WWW_DIR, event.path);

  console.log('livereload for file: ' + event.path);
  tinyLR.changed({
    body: {
      files: [fileName]
    }
  });
};

module.exports = {
  startExpress: startExpress,
  startLiveReload: startLiveReload,
  notifyLiveReload: notifyLivereload
};