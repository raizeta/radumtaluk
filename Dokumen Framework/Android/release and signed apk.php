<?php

1. keytool -genkey -v -keystore LukisonApp.keystore -alias LukisonApp -keyalg RSA -keysize 2048 -validity 10000

2. cordova build android --release -- --keystore=LukisonApp.keystore --storePassword=pinguin135 --alias=LukisonApp --password=pinguin135


jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore LukisonApp.keystore android-x86-release.apk LukisonApp

zipalign -v 4 android-x86-release-unaligned.apk your_project_name.apk