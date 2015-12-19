myAppModule.controller("NewSuplierController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);
myAppModule.controller("ListSuplierController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{
    $scope.loading  = true;
    $scope.userInfo = auth;

    apiService.listsuplier()
    .then(function (result) 
    {
        $scope.supliers = result.Suplier;
        $scope.loading = false;
        console.log($scope.supliers);
       
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");    
    });

    $scope.deletesuplier = function(suplier)
    {
       var id = suplier.ID;
       var nama = suplier.NM_SUPPLIER;
        if(confirm("Apakah Anda Yakin Menghapus Suplier:" + nama))
        {
            $location.path('/erp/masterbarang/delete/suplier/'+ id)
        }   
    }
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DetailSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", 
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idsuplier = $routeParams.idsuplier;
    singleapiService.singlelistsuplier(idsuplier)
    .then(function(data)
    {
        $scope.esupid = data.ID;
        $scope.esupkdsup = data.KD_SUPPLIER;
        $scope.esupnamasup = data.NM_SUPPLIER;
        $scope.esupalamat = data.ALAMAT;
        $scope.esupkota = data.KOTA;
        $scope.esuptlp = data.TLP;
        $scope.esupmobile = data.MOBILE;
        $scope.esupfax = data.FAX;
        $scope.esupemail = data.EMAIL;
        $scope.esupwebsite = data.WEBSITE;
        $scope.esupimage = data.IMAGE;
        $scope.esupnote = data.NOTE;
        $scope.esupkdcorp = data.KD_CORP;
        $scope.esupkdcab = data.KD_CAB;
        $scope.esupkddep = data.KD_DEP;
        $scope.esupstatus = data.STATUS;

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
myAppModule.controller("EditSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", 
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idsuplier = $routeParams.idsuplier;
    singleapiService.singlelistsuplier(idsuplier)
    .then(function(data)
    {
        $scope.esupid = data.ID;
        $scope.esupkdsup = data.KD_SUPPLIER;
        $scope.esupnamasup = data.NM_SUPPLIER;
        $scope.esupalamat = data.ALAMAT;
        $scope.esupkota = data.KOTA;
        $scope.esuptlp = data.TLP;
        $scope.esupmobile = data.MOBILE;
        $scope.esupfax = data.FAX;
        $scope.esupemail = data.EMAIL;
        $scope.esupwebsite = data.WEBSITE;
        $scope.esupimage = data.IMAGE;
        $scope.esupnote = data.NOTE;
        $scope.esupkdcorp = data.KD_CORP;
        $scope.esupkdcab = data.KD_CAB;
        $scope.esupkddep = data.KD_DEP;
        $scope.esupstatus = data.STATUS;

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

myAppModule.controller("DeleteSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path('/erp/masterbarang/list/suplier');
}]);