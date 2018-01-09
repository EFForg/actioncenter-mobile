EFF Alerts
============

EFF Alerts is an Ionic app for receiving news and push notifications from EFF.

Copyright (C) 2014-2016 Electronic Frontier Foundation (EFF).

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Table of Contents

* [Background Info](#background-info)
* [Getting Started](#getting-started)
* [Setting up Cordova](#setting-up-cordova)
* [App Configuration](#app-configuration)
* [Run tests](#run-tests)
* [Running the server](#running-the-server)
* [Running on device](#running-on-device)
* [Angular App](#angular-app)

## Background Info

EFF Alerts is a pager style app that notifies EFF supporters when EFF needs their help.

Although it works on both iOS and Android, the app is only targeting Android as of today. If you need to deploy to iOS as well, please check out the [Ionic docs](http://ionicframework.com/docs/) or contact the project maintainer for help.

The app is written using Cordova / Ionic, deploying an Angular webapp inside a UIWebView. This is to reduce the maintenance involved in managing multiple languages and fit with the existing EFF team's expertise.

## Getting started

```
npm install
bower install
gulp build # may get an error about missing module '../build/acmTemplates', just build again
```

## Setting up Cordova

Install the Cordova CLI tools

```
sudo npm install -g cordova
```

Set cordova dependencies up for the app

```
cordova platform add android
// Required as the localnotification plugin doesn't install correctly via the install_plugins hook
cordova plugin add de.appplant.cordova.plugin.local-notification && cordova prepare
```

## App Configuration

App config is controlled via the [node-config](https://github.com/lorenwest/node-config) module.

To set push credentials, create a local.json file under the [config dir](https://github.com/EFForg/actioncenter-mobile/tree/master/config) and override the CREDENTIALS setting.

Alternately, you can use:
* [Environment variables](https://github.com/lorenwest/node-config/wiki/Environment-Variables)
* [Command line options](https://github.com/lorenwest/node-config/wiki/Command-Line-Overrides)

## Run tests

```
gulp test
```

## Running the server

Spins up a local server to serve the app.

NOTE: the app assumes the presence of various plugins that a browser doesn't have, so some actions, e.g. share buttons etc. will not work and will throw errors

```
gulp watch
```

## Running on device

Gulp exposes two helper methods for running on device, these just wrap the respective ionic commands

```
gulp runAndroid
gulp runIos
```

## Angular app

See the [www/README.md](/www/README.md) for details
