myAppModule.filter('singleDecimal', function ($filter) {
    return function (input) {
        if (isNaN(input)) return input;
        return Math.round(input * 10) / 10;
    };
});

myAppModule.filter('setDecimal', function ($filter) {
    return function (input, places) {
        if (isNaN(input)) return input;
        // If we want 1 decimal place, we want to mult/div by 10
        // If we want 2 decimal places, we want to mult/div by 100, etc
        // So use the following to create that factor
        var factor = "1" + Array(+(places > 0 && places + 1)).join("0");
        return Math.round(input * factor) / factor;
    };
});

myAppModule.filter('htmlToPlaintext', function() 
{
    return function(text) 
    {
      return angular.element(text).text();
    }
  }
);

myAppModule.filter('myDateFormat', function myDateFormat($filter){
  return function(text){
    var  tempdate= new Date(text.replace(/-/g,"/"));
    return $filter('date')(tempdate, "dd-MMMM-yyyy HH:mm:ss");
  }
});

myAppModule.filter('durationview', ['datetime', function (datetime) {
    return function (input, css) {
        var duration = datetime.duration(input);
        return duration.days + "d:" + duration.hours + "h:" + duration.minutes + "m:" + duration.seconds + "s";
    };
}]);

myAppModule.filter("getDiff", function() 
{
  return function(time) 
  {
    if(time.CHECKIN_TIME && time.CHECKOUT_TIME )
    {
        var startDate = new Date(time.CHECKIN_TIME);
        var endDate = new Date(time.CHECKOUT_TIME);
        var milisecondsDiff = endDate - startDate;
        if(milisecondsDiff > 0)
        {
            return Math.floor(milisecondsDiff/(1000*60*60)).toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + (Math.floor(milisecondsDiff/(1000*60))%60).toLocaleString(undefined, {minimumIntegerDigits: 2})  + ":" + (Math.floor(milisecondsDiff/1000)%60).toLocaleString(undefined, {minimumIntegerDigits: 2}) ;
        }
        else
        {
            return 'TIDAK DIKETAHUI';    
        }
    }
    else
    {
        return 'TIDAK DIKETAHUI';
    }
  }
});

myAppModule.filter("getDiffAbsen", function() 
{
  return function(time) 
  {
    if(time.WAKTU_MASUK && time.WAKTU_KELUAR )
    {
        if(angular.isDate(new Date(time.WAKTU_MASUK)) && angular.isDate(new Date(time.WAKTU_KELUAR)))
        {
            var startDate = new Date(time.WAKTU_MASUK);
            var endDate = new Date(time.WAKTU_KELUAR);
            var milisecondsDiff = endDate - startDate;
            return Math.floor(milisecondsDiff/(1000*60*60)).toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" + (Math.floor(milisecondsDiff/(1000*60))%60).toLocaleString(undefined, {minimumIntegerDigits: 2})  + ":" + (Math.floor(milisecondsDiff/1000)%60).toLocaleString(undefined, {minimumIntegerDigits: 2}) ;
        }
        else
        {
            return 'TIDAK DIKETAHUI';    
        }
    }
    else
    {
        return 'TIDAK DIKETAHUI';
    }
  }
});