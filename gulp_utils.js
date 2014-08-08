/**
 * Utility functions used by Gulp tasks
 */

var path = require('path');

var WWW_DIR = path.join(__dirname, 'www');

var startExpress = function() {
  var express = require('express');
  var app = express();
  app.use(express.static(WWW_DIR));
  app.listen(4000);
};

var liveReload;
var startLiveReload = function startLiveReload() {
  liveReload = require('tiny-lr')();
  liveReload.listen();
};

var notifyLivereload = function(event) {
  var fileName = path.relative(WWW_DIR, event.path);

  liveReload.changed({
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