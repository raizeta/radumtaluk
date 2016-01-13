myAppModule.controller("NewBarangUnitController", ["$scope", "$location","$http", "authService", "auth","$window","$filter", 
function ($scope, $location, $http, authService, auth,$window,$filter) 
{
    $scope.setdecimali = function(buqty)
    {
        $scope.buqty = $filter('setDecimal')(buqty,2);
    }
    
    $scope.submitForm = function()
    {
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Accept': 'application/json, text/plain, */*'
                }
            };

            var data = 
                {
                    KD_UNIT: $scope.kodeunit,
                    NM_UNIT: $scope.bunmunit,
                    QTY: $scope.buqty
                };

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            var serialized = serializeObj(data); 

            $http.post('http://api.lukisongroup.com/master/unitbarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa',serialized,config)

            .success(function(data,status, headers, config) 
            {
                console.log(data);
                console.log(status);
                console.log(header);
                console.log(config);
                alert("Berhasil");

            })

            .error(function (data, status, header, config) 
            {
                alert(header);
                console.log(data);
                console.log(config);
                alert(status);       
            })

            .finally(function()
            {
               alert("Finally");
                $scope.loading = false;  
            });
            console.log(http);
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
        console.log($scope.unitbarangs);
       
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");    
    });
    
   $scope.menuOptions = 
    [
        ['View Detail', function ($itemScope) 
        {
            $scope.selected = $itemScope.barangumum.ID;
            alert($scope.selected);
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.barangumum.ID;
            alert($scope.selected);
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.barangumum.ID;
            alert($scope.selected);
        }]
    ]; 

    $scope.deletebarangunit = function(unitbarang)
    {
       var id = unitbarang.ID;
       var nama = unitbarang.NM_UNIT;
        if(confirm("Apakah Anda Yakin Menghapus Unit Barang:" + nama))
        {
            $location.path('/erp/masterbarang/delete/barangunit/'+ id)
        }   
    }

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

myAppModule.controller("DeleteBarangUnitController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path('/erp/masterbarang/list/barangunit')
}]);