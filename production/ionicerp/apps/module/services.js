angular.module('starter')
 
  .service('AuthService', function($q, $http) 
  {

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
    return {
      login: login
    };
  });