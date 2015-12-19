myAppModule.controller("NewBarangUnitController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.submitForm = function(isValid)
    {
        if (isValid) 
        { 
            
            $scope.loading = true;
            var data = $.param({json: JSON.stringify
                ({
                    eknamakategori: $scope.eknamakategori,
                    eknote: $scope.eknote,
                    status: $scope.statuskategori
                })
            });

            $http.post('http://api.lukisongroup.com/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa',data)
            .success(function(data,status, headers, config) 
            {
                alert("Berhasil");

            })

            .error(function (data, status, header, config) 
            {
                alert("Error");       
            })

            .finally(function()
            {
               alert("Finally");
                $scope.loading = false;  
            });
        }
        else
        {
            alert("form tidak valid");
        }


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