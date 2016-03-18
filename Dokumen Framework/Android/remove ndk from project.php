<?php
#http://pilcrowpipe.blogspot.co.id/2011/12/removing-native-support-from-android.html

Adding native support (right-click project for context menu -> Android Tools -> Add Native Support...) for the NDK to a normal Eclipse Android project is easily enough done and no doubt an oft task for some, but the reverse is something I found isn't on the menu (i.e. no "Remove Native Support").

After a little bit of playing around these are the steps I figured out. I'm currently using Eclipse Helios with Android NDK r6b.

Remove the lib and jni folders from your project and delete the contents of the bin folder.
From Windows Explorer remove the .cproject file and .externalToolBuilders folder if either of them exist in your project's root folder.
Edit the .project file in your project's root folder and remove any lines that match the following.
Look for the following in between the buildSpec tags:


<name>org.eclipse.cdt.managedbuilder.core.genmakebuilder</name>
   <triggers>clean,full,incremental,</triggers>
   <arguments>
    <dictionary>
     <key>?children?</key>
     <value>?name?=outputEntries\|?children?=?name?=entry\\\\\\\|\\\|\||</value>
    </dictionary>
    <dictionary>
     <key>?name?</key>
     <value></value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.append_environment</key>
     <value>true</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.buildArguments</key>
     <value>E:\dev\android\android-ndk-r6b\ndk-build</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.buildCommand</key>
     <value>bash</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.cleanBuildTarget</key>
     <value>clean</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.contents</key>
     <value>org.eclipse.cdt.make.core.activeConfigSettings</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.enableAutoBuild</key>
     <value>false</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.enableCleanBuild</key>
     <value>true</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.enableFullBuild</key>
     <value>true</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.fullBuildTarget</key>
     <value>V=1</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.stopOnError</key>
     <value>true</value>
    </dictionary>
    <dictionary>
     <key>org.eclipse.cdt.make.core.useDefaultBuildCmd</key>
     <value>false</value>
    </dictionary>
   </arguments>
  

# DELETE THE CODE BELOW
<buildcommand>
   <name>org.eclipse.cdt.managedbuilder.core.ScannerConfigBuilder</name>
   <triggers>full,incremental,</triggers>
   <arguments>
   </arguments>
</buildcommand>


<nature>org.eclipse.cdt.core.cnature</nature>
<nature>org.eclipse.cdt.core.ccnature</nature>	#DELETE THIS
<nature>org.eclipse.cdt.managedbuilder.core.managedBuildNature</nature>
<nature>org.eclipse.cdt.managedbuilder.core.ScannerConfigNature</nature> #DELETE THIS
