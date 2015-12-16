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
myAppModule.controller("ListSuplierController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.loading  = true;
    $scope.userInfo = auth;
    $http.get('http://api.lukisongroup.com/master/supliers?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.supliers = data.Suplier ;
    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function(){
        $scope.loading = false;
    });

    $scope.deletesuplier = function(suplier)
    {
       var id = suplier.ID;
       var nama = suplier.NM_SUPPLIER;
        if(confirm("Apakah Anda Yakin Menghapus Suplier:" + nama))
        {
            $location.path('/salesman/delete/suplier/'+ id)
        }   
    }
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);
myAppModule.controller("DetailSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idsuplier = $routeParams.idsuplier;
    $http.get('http://api.lukisongroup.com/master/supliers/'+ $scope.idsuplier + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
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

    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function()
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
myAppModule.controller("EditSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idsuplier = $routeParams.idsuplier;
    $http.get('http://api.lukisongroup.com/master/supliers/'+ $scope.idsuplier + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
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

    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function()
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
myAppModule.controller("DeleteSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idsuplier = $routeParams.idsuplier;
    $http.get('http://api.lukisongroup.com/master/supliers/'+ $scope.idsuplier + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
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

    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function()
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