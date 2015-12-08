myAppModule.controller("NewRequestOrderController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    $scope.barum = true;
    $http.get('http://api.lukisongroup.com/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.kategoris = data.Kategori ;

    })
    .error(function (data, status, header, config) 
    {
        alert("Tidak Bisa Mendapatkan Data Kategori");    
    });

    $scope.kodekategorichange = function()
    {
        $scope.barum = false;
        if($scope.user.kategoris)
        {
            $http.get('http://api.lukisongroup.com/master/barangumums?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
            .success(function(data,status, headers, config) 
            {
                $scope.barangumums = data.BarangUmum ;
            })

            .error(function (data, status, header, config) 
            {
                    
            })
        }
        else
        {
            $scope.barangumums = null;
            $scope.barum = true;
        }
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);

myAppModule.controller("NewSalesOrderController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);


myAppModule.controller("NewPurchaseOrderController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
}]);