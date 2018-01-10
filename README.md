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
* [Angular App](#angular-app)

## Background Info

EFF Alerts is a pager style app that notifies EFF supporters when EFF needs their help.

Although it works on both iOS and Android, the app is only targeting Android as of today. If you need to deploy to iOS as well, please check out the [Ionic docs](http://ionicframework.com/docs/) or contact the project maintainer for help.

The app is written using Cordova / Ionic, deploying an Angular webapp inside a UIWebView. This is to reduce the maintenance involved in managing multiple languages and fit with the existing EFF team's expertise.

## Getting started

Follow these instructions to develop EFF Alerts using Docker (recommended):

1. Install Docker ([instructions](https://docs.docker.com/engine/installation/)) and Docker Compose ([instructions](https://docs.docker.com/compose/install/)).
2. `git clone https://github.com/EFForg/actioncenter-mobile.git`
3. Copy `.env.example` to `.env`.
4. Copy `google-services.json` into the project root (if it's not available, just create it as an empty file).
5. Copy your Android Keystore into the project root at `eff-alerts.keystore` (only required if you are building a signed APK).
6. Build the docker image: `sudo docker-compose build`
7. Run the application: `sudo docker-compose up`
8. Access the app in a web browser at http://localhost:4001/.

NOTE: the app assumes the presence of various plugins that a browser doesn't have, so some actions, e.g. share buttons etc. will not work and will throw errors

## Run tests

```
sudo docker-compose exec app gulp test
```

## Angular app

See the [www/README.md](/www/README.md) for details
