myAppModule.controller("NewBarangUnitController", ["$scope", "$location","$http", "authService", "auth","$window","$filter", 
function ($scope, $location, $http, authService, auth,$window,$filter) 
{
    $scope.setdecimali = function(buqty)
    {
        $scope.buqty = $filter('setDecimal')(buqty,2);
    }
    
    $scope.submitForm = function()
    {

            // var data = $.param({json: JSON.stringify
            //     ({
            //         eknamakategori: $scope.eknamakategori,
            //         eknote: $scope.eknote,
            //         status: $scope.statuskategori
            //     })
            // });

            var data = {
                    "LAT": "2",
                    "LAG": "2",
                    "RADIUS": "1",
                    "CREATED_BY": "1",
                    "CREATED_AT": "2015-01-12 10:00:01",
                    "CUST_ID": "1"
                };
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
                    'Accept': 'application/json, text/plain, */*'
                }
            };


            console.log(data);

            $http.post('http://api.lukisongroup.com/notify/gps_customers/acreate?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa',data)

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