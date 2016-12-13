angular.module('starter', ['ionic','ngFitText'])
.run(function($ionicPlatform) 
{
    $ionicPlatform.ready(function() 
    {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) 
        {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) 
        {
            StatusBar.styleDefault();
        }

        var notificationOpenedCallback = function(jsonData) 
        {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal.startInit("a291df49-653d-41ff-858d-e36513440760", "943983549601")
                      .handleNotificationOpened(notificationOpenedCallback)
                      .endInit();
    });
});
