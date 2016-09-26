angular.module('starter')
.service('UtilService', function($q, $http) 
{
    var ApiUrl = function()
    {
      return "http://api.lukisongroup.com/master";
    }
    var ArrayChunk = function (arr, size) 
    {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) 
      {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }

    var SerializeObject = function (objecttoserialize) 
    {
        var result={};
        function serializeObj(obj) 
        {
          var result = [];
          for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
          return result.join("&");
        }
        
        var serialized = serializeObj(objecttoserialize); 
        var config = 
        {
            headers : 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'   
            }
        };
        result.serialized   = serialized;
        result.config       = config;

        return result;
    }
    var SumPriceQtyWithCondition = function(items,price,qty,condition)
    {
        return items.reduce( function(a, b)
        {
            if(b[condition])
            {
              if(b[price] == undefined || b[qty] == undefined)
              {
                  return a + 0;
              }
              else
              {
                  return a + (b[price] * b[qty]);
              }
            }
            
        }, 0);
    }
    var SumPriceWithQty = function(items,price,qty)
    {
        return items.reduce( function(a, b)
        {
            if(b[price] == undefined || b[qty] == undefined)
            {
                return a + 0;
            }
            else
            {
                return a + (b[price] * b[qty]);
            }
        }, 0);
    }
    var SumJustPriceOrQty = function(items, price)
    {
        return items.reduce( function(a, b)
        {
            if(b[price] == undefined)
            {
                return a + 0;
            }
            else
            {
                return a + b[price];
            }
        }, 0);
    }
    
    return {
      ArrayChunk:ArrayChunk,
      ApiUrl:ApiUrl,
      SumPriceQtyWithCondition:SumPriceQtyWithCondition,
      SerializeObject:SerializeObject,
      SumPriceWithQty:SumPriceWithQty,
      SumJustPriceOrQty:SumJustPriceOrQty
    };
});