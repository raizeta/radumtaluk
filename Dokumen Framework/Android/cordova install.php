<?php
#Check Requiretments
cordova requirements android

############################

#update npm
npm install -g npm

npm install -g cordova

cordova create lukison com.example.lukison Lukison

cd MyApp


#Add Platform For SDK 21
cordova platforms add android@3.7.1

#Remove Platform 
#cordova platforms rm android

#For SDK 22
cordova platforms add android@5.1.1

cordova build android //lakukan berkalikali sampai tidak ada error


cordova platform update android --save