#!/bin/bash

set -e

GULP=0
SIGN=0
KEYSTORE_FILE=
KEYSTORE_ALIAS=

while [ $# -ne 0 ]; do
    case $1 in
        --gulp)
            GULP=1
            shift
            ;;

        --sign)
            SIGN=1
            KEYSTORE_FILE=$(echo "$2" | cut -d : -f 1)
            KEYSTORE_ALIAS=$(echo "$2" | cut -d : -f 2)
            shift 2
            ;;

        *)
            echo "Usage: $0 [--gulp] [--sign alias]"
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

