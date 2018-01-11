FROM openjdk:8

RUN mkdir /opt/app
WORKDIR /opt/app

RUN apt-get update && apt-get install -y curl \
  && curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
  && apt-get update && apt-get install -y google-chrome-stable

RUN set -x; \
  curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh \
  && chmod +x nodesource_setup.sh \
  && ./nodesource_setup.sh \
  && dpkg --add-architecture i386 \
  && apt-get update \
  && apt-get install -y --no-install-recommends \
    nodejs \
    file \
    git \
    curl \
    zip \
    libncurses5:i386 \
    libstdc++6:i386 zlib1g:i386 \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* ./nodesource_setup.sh

ENV ANDROID_HOME="/root/android-sdk-linux" \
    ANDROID_SDK_VERSION=27.0.2

ENV PATH="/root/gradle/bin:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/build-tools/${ANDROID_SDK_VERSION}:/opt/app/node_modules/.bin:${PATH}"

# Download Android SDK
RUN mkdir "$ANDROID_HOME" .android \
 && cd "$ANDROID_HOME" \
 && curl -Lo sdk.zip https://dl.google.com/android/repository/sdk-tools-linux-3859397.zip \
 && unzip sdk.zip \
 && rm sdk.zip \
 && yes | sdkmanager --licenses
RUN sdkmanager "build-tools;$ANDROID_SDK_VERSION"

# Install Gradle
RUN cd /root \
 && curl -Lo gradle.zip https://services.gradle.org/distributions/gradle-4.1-all.zip \
 && unzip gradle.zip \
 && mv gradle-4.1 gradle \
 && mkdir .gradle


RUN npm install -g cordova
RUN cordova telemetry off

RUN echo '{ "allow_root": true }' > /root/.bowerrc
COPY ./package.json ./bower.json ./

RUN npm install && bower install

COPY ./config.xml ./
COPY ./hooks ./hooks
COPY ./www/img ./www/img
COPY ./ionic.project ./

RUN mkdir ./platforms ./plugins

# `cordova platform add android` returns non-zero for some reason
RUN cordova platform add android --verbose; true
RUN cordova plugin add cordova-plugin-whitelist@1.3.3
RUN cordova plugin add de.appplant.cordova.plugin.local-notification

# Build Gradle wrapper
ENV CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=gradle.zip
RUN mkdir -p platforms/android/gradle/wrapper \
 && mv /root/gradle.zip platforms/android/gradle/wrapper \
 && cordova clean

COPY ./.eslintrc \
     ./build.sh \
     ./gulpfile.js \
     ./

COPY ./config ./config
COPY ./gulp ./gulp
COPY ./scss ./scss
COPY ./test ./test
COPY ./www/index.html ./www/index.html
COPY ./www/js ./www/js
COPY ./www/templates ./www/templates

# The first gulp build is expected to fail.
RUN gulp build; gulp build

