<?php
1. Create file "facebookconnect.xml" di folder platforms/android/res/values/#nama file yang anda create*
2. Isi File Tersebut Dengan Kode Di Bawah Ini
	<?xml version='1.0' encoding='utf-8'?>
	<resources>
		<string name="fb_app_id">1775775485972165</string>
	    <string name="fb_app_name">Maxi Event</string>
	</resources>

3.Jalankan code di bawah di command prompt
cordova -d plugin add https://github.com/phonegap/phonegap-facebook-plugin.git --variable APP_ID="1775775485972165" --variable APP_NAME="Maxi Event"