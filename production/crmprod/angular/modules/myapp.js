'use strict';
var myAppModule 	= angular.module('myAppModule',
								['ngRoute','ngResource','ngToast','angularSpinner','ui.bootstrap','ngAnimate',
                                    'ui.select2','naif.base64','monospaced.qrcode',
                                 'ngCordova','ngMap','mm.acl','ng-mfb','ngMaterial','ngMessages','hSweetAlert','mwl.calendar']);
myAppModule.run(["$rootScope", "$location","uiSelect2Config", 
function ($rootScope, $location,uiSelect2Config) 
{
    uiSelect2Config.placeholder = "Placeholder text";
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        // console.log(userInfo);
    });
   
    $rootScope.$on("$routeChangeSuccess", function (userInfo) 
    {
        // console.log(userInfo);
    });

    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) 
    {
        if (eventObj.authenticated === false) 
        {
            $location.path("/login");
        }
    });
}]);

myAppModule.config(['ngToastProvider','calendarConfig', function(ngToastProvider,calendarConfig) 
{
      ngToastProvider.configure(
      {
            animation: 'slide', // or 'fade',
            className: 'success',
            dismissButton: true,
            dismissButtonHtml:'&times;',
            compileContent: true,
            timeout:1000,
            horizontalPosition:'right',     //left, center
            verticalPosition:   'bottom',  //top,center
            maxNumber: 3 // 0 for unlimited
      });
      
    calendarConfig.templates.calendarMonthView = 'bower_components/angular-bootstrap-calendar/src/templates/calendarMonthView.html'; //change the month view template to a custom template

    calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

    calendarConfig.i18nStrings.eventsLabel = 'Events'; //This will set the events label on the day view

    calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

    calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

    calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.

}]);

// myAppModule.config(['calendarConfig',function(calendarConfig) 
// {



//     calendarConfig.templates.calendarMonthView = 'bower_components/angular-bootstrap-calendar/src/templates/calendar.html'; //change the month view template to a custom template

//     calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

//     calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

//     calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

//     calendarConfig.i18nStrings.eventsLabel = 'Events'; //This will set the events label on the day view

//     calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

//     calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

//     calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.

// }]);


