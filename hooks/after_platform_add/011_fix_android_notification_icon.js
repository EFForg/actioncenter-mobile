#!/usr/bin/env node

/**
 * Update the GCMIntentService.java file to use our notification icon to badge notifications.
 *
 * By default the push plugin uses the standard app icon to badge new notifications. This gives a
 * weirdly zoomed and cropped icon with our standard logo. The only way I've been able to work
 * around this is to tweak the push plugin GCMIntentService.java file to use our notification_icon.
 *
 */

var lodash = require('lodash');
var path = require('path');
var replace = require('replace');

var projectRoot = path.join(__dirname, '../..');


var gcmIntentServicePath = path.join(
  projectRoot, 'platforms/android/src/com/plugin/gcm/GCMIntentService.java');

replace({
  regex: /context.getApplicationInfo\(\).icon/,
  replacement: 'R.drawable.notification_icon',
  paths: [gcmIntentServicePath]
});

replace({
  regex: /package com.plugin.gcm;/,
  replacement: '// NOTE: THIS FILE HAS BEEN MODIFIED BY THE hooks/011_fix_android_notification_icon.js SCRIPT\n\npackage com.plugin.gcm;\n\nimport com.eff.actioncenter.R;',
  paths: [gcmIntentServicePath]
});
