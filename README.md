actioncenter-mobile
============

Simple Ionic app for receiving and handling push notifications.

### Getting started

```
npm install
gulp bower
gulp build
```

### Setting project credentials

App config is controlled via the [node-config](https://github.com/lorenwest/node-config) module.

To set your credentials, create a local.json file under the [config dir](https://github.com/EFForg/actioncenter-mobile/tree/master/config) and override the CREDENTIALS setting.

Alternately, you can use:
* [Environment variables](https://github.com/lorenwest/node-config/wiki/Environment-Variables)
* [Command line options](https://github.com/lorenwest/node-config/wiki/Command-Line-Overrides)

### Setting up Cordova

```
cordova platform add android
// Required as the localnotification plugin doesn't install correctly via the install_plugins hook
cordova plugin add de.appplant.cordova.plugin.local-notification && cordova prepare
```

### Running the server

Spins up a local server to serve the app.

NOTE: the app assumes the presence of various plugins that a browser doesn't have, so some actions, e.g. share buttons etc. will not work and will throw errors

```
gulp watch
```

### Running on device

Gulp exposes two helper methods for running on device, these just wrap the respective ionic commands

```
gulp runAndroid

gulp runIos
```
