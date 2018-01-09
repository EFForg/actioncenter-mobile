#!/bin/bash

set -e

GULP=1
SIGN=0
KEYSTORE_FILE=eff-alerts.keystore
KEYSTORE_ALIAS=

while [ $# -ne 0 ]; do
    case $1 in
        --no-gulp)
            GULP=0
            shift
            ;;

        --sign)
            SIGN=1
            KEYSTORE_ALIAS=$2
            shift 2
            ;;

        *)
            echo "Usage: $0 [--no-gulp] [--sign alias]"
            exit 1
            ;;

    esac
done

if [ $GULP -eq 1 ]; then
    cordova clean

    npm install
    NODE_ENV=production gulp build
fi

cordova build --release android

cp platforms/android/build/outputs/apk/release/android-release-unsigned.apk android-release-unsigned.apk

if [ $SIGN -eq 1 ]; then
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
              -keystore "$KEYSTORE_FILE" \
              android-release-unsigned.apk \
              "$KEYSTORE_ALIAS"
fi

zipalign -f -v 4 android-release-unsigned.apk releases/android-release.apk

