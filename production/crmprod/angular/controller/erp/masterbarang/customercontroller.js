myAppModule.controller("NewCustomerController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.submitForm = function(barangumum)
    {
        $scope.loading =true;
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }   
}]);

myAppModule.controller("ListCustomerController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner", function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner) 
{  
    $scope.loading  = true;
    $scope.userInfo = auth;
    $http.get('')
    .success(function(data,status, headers, config) 
    {

    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function()
    {
        $scope.loading = false;
    });


    $scope.deletedistributor = function(distributora)
    {
       var namadistributor = distributor.NM_DISTRIBUTOR;
       var id = distributor.ID;
        if(confirm("Apakah Anda Yakin Menghapus Barang Umum:" + distributor))
        {
                $cordovaBarcodeScanner
                  .scan()
                  .then(function(barcodeData) {
                    // Success! Barcode data is here
                  }, function(error) {
                    // An error occurred
                  });
        }   
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    $http.get('')
    .success(function(data,status, headers, config) 
    {

        
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
    {
        $scope.loading = false ;
    });

    
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("EditCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    $http.get('')
    .success(function(data,status, headers, config) 
    {
    
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
    {
        $scope.loading = false ;
    });

    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("DeleteCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    // $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    
    alert($scope.iddistributor);
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }

    _.each(products, function(result) 
    {
      _.each(result.properties, function(result) 
      {      
        var existingFilter = _.findWhere(filters, { name: result.name });

        if (existingFilter) 
        {


          var existingOption = _.findWhere(existingFilter.options, { value: result.value });
          if (existingOption) 
          {

            existingOption.count += 1;
          } 
          else 
          {

            existingFilter.options.push({ value: result.value, count: 1 }); 
          }   
        } 

        else 
        {

          var filter = {};
          filter.name = result.name;

          filter.options = [];

          filter.options.push({ value: result.value, count: 1 });

          filters.push(filter);      
        }   
      });
    });
    
}]);



