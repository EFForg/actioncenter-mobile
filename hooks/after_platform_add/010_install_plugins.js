#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var sys = require('sys');
var exec = require('child_process').exec;

// Install the project plugins
var plugins = {
  'com.ohh2ahh.plugins.appavailability': 'https://github.com/ohh2ahh/AppAvailability.git',
  'com.ionic.keyboard': 'com.ionic.keyboard',
  'org.apache.cordova.globalization': 'org.apache.cordova.globalization',
  'com.phonegap.plugins.PushPlugin': 'https://github.com/phonegap-build/PushPlugin.git',
  'de.appplant.cordova.plugin.local-notification': 'de.appplant.cordova.plugin.local-notification',
  'nl.x-services.plugins.socialsharing': 'https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin.git',
  'org.apache.cordova.console': 'org.apache.cordova.console',
  'org.apache.cordova.device': 'org.apache.cordova.device',
  'org.apache.cordova.statusbar': 'org.apache.cordova.statusbar',
  'org.apache.cordova.whitelist' : 'org.apache.cordova.whitelist',
};

var installPlugins = function(installedPlugins) {
  var pluginName;
  for (var key in plugins) {
    if (installedPlugins.indexOf(key) === -1) {
      pluginName = plugins[key];
      exec('cordova plugin add '+ pluginName, function(error, stdout, stderr) {
        sys.print(stdout);
      });
    }
  }
};

exec('cordova plugin list', function(error, stdout, stderr) {
  var stdoutArr = stdout.toString('utf-8').trim().split('\n');

  var installedPlugins = [];
  for (var i = 0; i < stdoutArr.length; i++) {
    var pluginName = stdoutArr[i].split(' ')[0];
    installedPlugins.push(pluginName);
  }

  installPlugins(installedPlugins);
});
