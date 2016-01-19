myAppModule.controller("NewBarangUnitController", ["$scope", "$location","$http", "authService", "auth","$window","$filter", 
function ($scope, $location, $http, authService, auth,$window,$filter) 
{
    $scope.setdecimali = function(buqty)
    {
        $scope.buqty = $filter('setDecimal')(buqty,2);
    }
    
    $scope.submitForm = function(barangunit)
    {
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Accept': 'application/json, text/plain, */*'
                }
            };

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            var serialized = serializeObj(barangunit); 

            $http.post('http://labtest3-api.int/master/unitbarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa',serialized,config)

            .success(function(data,status, headers, config) 
            {
                $location.path('/erp/masterbarang/list/barangunit');

            })

            .error(function (data, status, header, config) 
            {
                alert("error");       
            })

            .finally(function()
            {
               alert("Finally");
                $scope.loading = false;  
            });
    }

    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("ListBarangUnitController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", function ($scope, $location, $http, authService, auth,$window,apiService) 
{
    $scope.loading  = true;
    $scope.userInfo = auth;
    
    apiService.listbarangunit()
    .then(function (result) 
    {
        $scope.unitbarangs = result.Unitbarang;
        $scope.loading = false;  
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");    
    });
    
   $scope.menuOptions = 
    [
        ['View Detail', function ($itemScope) 
        {
            $scope.selected = $itemScope.unitbarang.ID;
            $location.path('/erp/masterbarang/detail/barangunit/'+$scope.selected );
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.unitbarang.ID;
            $location.path('/erp/masterbarang/edit/barangunit/'+$scope.selected );
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.unitbarang.ID;

            if(confirm("Apakah Anda Yakin Menghapus Unit Barang:" + $scope.selected))
            {
                $location.path('/erp/masterbarang/delete/barangunit/'+ $scope.selected)
            } 

        }]
    ]; 


    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailBarangUnitController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idbarangunit = $routeParams.idbarangunit;
    singleapiService.singlelistbarangunit(idbarangunit)
    .then(function(data)
    {
        $scope.buid = data.ID;
        $scope.bukdunit = data.KD_UNIT;
        $scope.bunmunit = data.NM_UNIT;
        $scope.buqty = data.QTY;
        $scope.busize = data.SIZE;
        $scope.buweight = data.WEIGHT;
        $scope.bucolor = data.COLOR;
        $scope.bunote = data.NOTE;
        $scope.bustatus = data.STATUS;
        $scope.loading = false;
    },
    function(error)
    {

    });
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("EditBarangUnitController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;

    var idbarangunit = $routeParams.idbarangunit;
    singleapiService.singlelistbarangunit(idbarangunit)
    .then(function(data)
    {
        $scope.loading = false;
        $scope.data = data;
    });

    $scope.submitForm = function(data)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(data); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.put("http://labtest3-api.int/master/unitbarangs/"+ idbarangunit +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                $location.path("/erp/masterbarang/list/barangunit");

            })

            .finally(function()
            {
                $scope.loading = false;  
            });

    }
    $scope.logout = function () 
    {
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DeleteBarangUnitController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    var idbarangunit = $routeParams.idbarangunit;
    var config = 
    {
        headers : 
        {
            'Content-Type': 'application/x-www-form-urlencoded', 
        }
    };
    
    $http.delete("http://labtest3-api.int/master/unitbarangs/"+ idbarangunit +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",config)
    .success(function(data,status, headers, config) 
    {
        $location.path('/erp/masterbarang/list/barangunit');

    })

    .error(function (data, status, header, config) 
    {
        alert("Tidak Berhasil");    
    })

    .finally(function()
    {
        $scope.loading = false;  
    });
}]);