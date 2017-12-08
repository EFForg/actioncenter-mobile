#!/usr/bin/env node

/**
 * Update the GCMIntentService.java file to use our notification icon to badge notifications.
 *
 * By default the push plugin uses the standard app icon to badge new notifications. This gives a
 * weirdly zoomed and cropped icon with our standard logo. The only way I've been able to work
 * around this is to tweak the push plugin GCMIntentService.java file to use our notification_icon.
 *
 */


var path = require('path');
var exec = require('child_process').exec;

var projectRoot = path.join(__dirname, '../..');


var gcmIntentServicePath = path.join(
  projectRoot, 'platforms/android/src/com/plugin/gcm/GCMIntentService.java');

exec('sed -i "s@context.getApplicationInfo().icon@R.drawable.notification_icon@" "' + gcmIntentServicePath + '"');
exec('sed -i "s@package com.plugin.gcm;@\\n// NOTE: THIS FILE HAS BEEN MODIFIED BY THE hooks/011_fix_android_notification_icon.js SCRIPT\\npackage com.plugin.gcm;\\n\import org.eff.actioncenter.R;\\n@" "' + gcmIntentServicePath + '"');
