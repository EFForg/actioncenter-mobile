#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
var lodash = require('lodash');
var path = require('path');
var sys = require('sys');

var PROJECT_ROOT = process.argv[2];
var IMG_DIR = path.join(PROJECT_ROOT, 'www/img');


var fetchDirectories = function(dirPath) {
  return fs.readdirSync(dirPath).filter(function (file) {
    return fs.statSync(path.join(dirPath, file)).isDirectory();
  });
};


var copyResources = function(srcPath, destPath) {

  console.log(srcPath);
  console.log(destPath);

  fs.exists(destPath, function(exists) {
    if (exists) {
      var cmd = 'cp -rf ' + srcPath + '/* ' + destPath + '/';
    } else {
      var cmd = 'cp -rf ' + srcPath + ' ' + destPath;
    }
    exec(cmd);
  });
};


var copyFilesFromMapping = function(fileMap) {
  lodash.forEach(fileMap, function(sourceFile, targetFile) {
    copyResources(sourceFile, targetFile);
  });
};


var copyIosResources = function(imgDir, projectRoot) {
  var resourcesDir =  path.join(projectRoot, 'platforms/ios/EFF\\ Alerts/Resources');
  var iconsDir = path.join(resourcesDir, 'icons');
  var splashDir = path.join(resourcesDir, 'splash');

  var imgIconsDir = path.join(imgDir, 'app_icons/ios/square');
  var imgSplashDir = path.join(imgDir, 'splash/ios');

  var defaultIconMapping = lodash.zipObject([
    [path.join(iconsDir, 'icon-small.png'), path.join(imgIconsDir, 'icon-29.png')],
    [path.join(iconsDir, 'icon-small@2x.png'), path.join(imgIconsDir, 'icon-29@2x.png')],
    [path.join(iconsDir, 'icon.png'), path.join(imgIconsDir, 'icon-57.png')],
    [path.join(iconsDir, 'icon@2x.png'), path.join(imgIconsDir, 'icon-57@2x.png')]
  ]);
  copyFilesFromMapping(defaultIconMapping);

  var defaultSplashMapping = lodash.zipObject([
    [path.join(splashDir, 'Default~iphone.png'), path.join(imgSplashDir, 'Default-portrait~iphone.png')],
    [path.join(splashDir, 'Default@2x~iphone.png'), path.join(imgSplashDir, 'Default-portrait@2x~iphone4.png')],
    [path.join(splashDir, 'Default-568h@2x~iphone.png'), path.join(imgSplashDir, 'Default-portrait@2x~iphone5.png')]
  ]);
  copyFilesFromMapping(defaultSplashMapping);

  copyResources(path.join(imgIconsDir, '*'), path.join(resourcesDir, 'icons'));
  copyResources(path.join(imgDir, 'splash/ios/*'), path.join(resourcesDir, 'splash'));
};


var copyAndroidResources = function(imgDir, projectRoot) {
  var androidResDir = path.join(projectRoot, 'platforms/android/res');
  var androidIconDir = path.join(imgDir, 'app_icons/android');
  var androidIconDirs = fetchDirectories(androidIconDir);

  for (var i = 0, dirToCopy, destDir, srcDir; i < androidIconDirs.length; i++) {
    dirToCopy = androidIconDirs[i];
    srcDir = path.join(androidIconDir, dirToCopy);
    destDir = path.join(androidResDir, dirToCopy);
    copyResources(srcDir, destDir);
  }
};


copyAndroidResources(IMG_DIR, PROJECT_ROOT);
copyIosResources(IMG_DIR, PROJECT_ROOT);
