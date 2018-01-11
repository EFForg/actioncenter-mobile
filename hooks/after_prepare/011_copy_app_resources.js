#!/usr/bin/env node

var exec = require('child_process').exec;
var fs = require('fs');
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
  Object.keys(fileMap).forEach(function(sourceFile) {
    copyResources(sourceFile, fileMap[sourceFile]);
  });
};


var copyIosResources = function(imgDir, projectRoot) {
  var resourcesDir =  path.join(projectRoot, 'platforms/ios/EFF\\ Alerts/Resources');
  var iconsDir = path.join(resourcesDir, 'icons');
  var splashDir = path.join(resourcesDir, 'splash');

  var imgIconsDir = path.join(imgDir, 'app_icons/ios/square');
  var imgSplashDir = path.join(imgDir, 'splash/ios');

  var defaultIconMapping = {};
  defaultIconMapping[path.join(iconsDir, 'icon-small.png')] = path.join(imgIconsDir, 'icon-29.png');
  defaultIconMapping[path.join(iconsDir, 'icon-small@2x.png')] =path.join(imgIconsDir, 'icon-29@2x.png');
  defaultIconMapping[path.join(iconsDir, 'icon.png')] =path.join(imgIconsDir, 'icon-57.png');
  defaultIconMapping[path.join(iconsDir, 'icon@2x.png')] =path.join(imgIconsDir, 'icon-57@2x.png');
  copyFilesFromMapping(defaultIconMapping);

  var defaultSplashMapping = {};
  defaultSplashMapping[path.join(splashDir, 'Default~iphone.png')] = path.join(imgSplashDir, 'Default-portrait~iphone.png');
  defaultSplashMapping[path.join(splashDir, 'Default@2x~iphone.png')] = path.join(imgSplashDir, 'Default-portrait@2x~iphone4.png');
  defaultSplashMapping[path.join(splashDir, 'Default-568h@2x~iphone.png')] = path.join(imgSplashDir, 'Default-portrait@2x~iphone5.png');
  copyFilesFromMapping(defaultSplashMapping);

  copyResources(path.join(imgIconsDir, '*'), path.join(resourcesDir, 'icons'));
  copyResources(path.join(imgDir, 'splash/ios/*'), path.join(resourcesDir, 'splash'));
};


var copyAndroidResources = function(imgDir, projectRoot) {
  var androidResDir = path.join(projectRoot, 'platforms/android/res');
  var androidIconDir = path.join(imgDir, 'app_icons/android');
  var androidIconDirs = fetchDirectories(androidIconDir);

  for (var i = 0, dirToCopy, destDir, srcDir, density; i < androidIconDirs.length; i++) {
    dirToCopy = androidIconDirs[i];
    srcDir = path.join(androidIconDir, dirToCopy);
    destDir = path.join(androidResDir, dirToCopy);
    copyResources(srcDir, destDir);
    density = dirToCopy.split('-').pop();
    // Copy icon to mipmap directories.
    copyResources(srcDir, path.join(androidResDir, 'mipmap-' + density));
    // Remove Cordova default splashscreen.
    fs.unlink(path.join(androidResDir, 'drawable-land-' + density, 'screen.png'), (err) => {});
    fs.unlink(path.join(androidResDir, 'drawable-port-' + density, 'screen.png'), (err) => {});
  }
};


copyAndroidResources(IMG_DIR, PROJECT_ROOT);
copyIosResources(IMG_DIR, PROJECT_ROOT);
