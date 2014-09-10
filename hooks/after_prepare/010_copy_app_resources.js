#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var sys = require('sys');

var projectRoot = process.argv[2];
var iconsDir = path.join(projectRoot, 'www/img/app_icons');

var fetchDirectories = function(dirPath) {
  return fs.readdirSync(dirPath).filter(function (file) {
    return fs.statSync(path.join(dirPath, file)).isDirectory();
  });
}

var copyResources = function(srcDir, destDir) {
  fs.exists(destDir, function(exists) {
    if (exists) {
      var cmd = 'cp -rf ' + srcDir + '/* ' + destDir + '/*';
    } else {
      var cmd = 'cp -rf ' + srcDir + ' ' + destDir;
    }
    exec(cmd);
  });
};

var androidResDir = path.join(projectRoot, 'platforms/android/res');
var androidIconDir = path.join(iconsDir, 'android');
var androidIconDirs = fetchDirectories(androidIconDir);
for (var i = 0, dirToCopy, destDir, srcDir; i < androidIconDirs.length; i++) {
  dirToCopy = androidIconDirs[i];
  srcDir = path.join(androidIconDir, dirToCopy);
  destDir = path.join(androidResDir, dirToCopy);
  copyResources(srcDir, destDir);
}
