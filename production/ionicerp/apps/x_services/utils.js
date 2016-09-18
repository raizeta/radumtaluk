angular.module('starter')
.service('UtilService', function($q, $http) 
{
    var ApiUrl = function()
    {
      return "http://api.lukisongroup.com/master";
    }
    var login = function(name, pw) 
    {
      return $q(function(resolve, reject) 
      {
        if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) 
        {
          resolve('Login success.');
        } 
        else 
        {
          reject('Login Failed.');
        }
      });
    };
    var ArrayChunk = function (arr, size) 
    {
      var newArr = [];
      for (var i=0; i<arr.length; i+=size) 
      {
        newArr.push(arr.slice(i, i+size));
      }
      return newArr;
    }
    return {
      login: login,
      ArrayChunk:ArrayChunk,
      ApiUrl:ApiUrl
    };
});