Deploying the app
============

## Setup 3rd Party Services

* [Google API project](http://developer.android.com/google/gcm/gs.html)

## Update config settings

Check that you've updated [your configuration settings](/config/production.json) file to reflect the correct values:

* Delete or remove the local.json file in the config directory. Otherwise this will overwrite the values in production.json
* <code>API.ENDPOINT</code>: update to point this at the remote API server
* <code>CREDENTIALS.ANDROID.SENDER_ID</code>: update this to the id of the [Google Developers Console project](https://cloud.google.com/console) project you created to run this app
* <code>SHARING.URL</code>: update this to the URL to use when the user uses a share action from within the app
* <code>SHARING.MESSAGES</code>: update these to reflect the custom sharing messages your organization wants to use

## Update ionic.project

Update the [Ionic project file](/ionic.project) and [config.xml](/config.xml) files to reflect your organization, e.g. update the <description> field, set the domains the app is allowed to communicate with etc.


## Prepare your Cordova project

Please see the Ionic - [Publishing your app page for full details](http://ionicframework.com/docs/guide/publishing.html)

* Run <code>cordova plugin rm org.apache.cordova.console</code>
* Edit the AndroidManifest.xml file under platforms/android
  * change <code>android:name</code> to the correct name for your app
  * change <code>android:debuggable="true"</code> to <code>android:debuggable="false"</code> or add it if not present

## Creating a release build

```
export NODE_ENV=production
gulp build
cordova build --release android
```

Please refer to the "Android Publishing" section of the [Ionic publishing guide](http://ionicframework.com/docs/guide/publishing.html) for details of how to sign the generated APK and prepare it for the app store.
