myAppModule.controller("NewTipeBarangController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{
    $scope.submitForm = function()
    {
 
            $scope.loading = true;
            var data = 
                {
                    NM_TYPE: $scope.namatipe,
                    STATUS: 1,
                    KD_TYPE: $scope.kodetipe,
                    NOTE: $scope.catatan
                };

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            console.log(data);
            $http.post('http://api.lukisongroup.com/master/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa',data,config)
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

    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }  
}]);

myAppModule.controller("ListTipeBarangController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{

    $scope.loading  = true;
    $scope.userInfo = auth;
    apiService.listtipebarang()
    .then(function (result) 
    {
        $scope.typebarangs = result.Tipebarang;
        $scope.loading = false;
        console.log($scope.typebarangs);
       
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");    
    });

    $scope.deletetipebarang = function(typebarang)
    {
       var id = typebarang.ID;
       var nama = typebarang.NM_TYPE;
        if(confirm("Apakah Anda Yakin Menghapus Type Barang:" + nama))
        {
            $location.path('/erp/masterbarang/delete/tipebarang/'+ id)
        }   
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idtipebarang = $routeParams.idtipebarang;
    singleapiService.singlelisttipebarang(idtipebarang)
    .then(function(data)
    {
        $scope.etbid = data.ID ;
        $scope.etbkdtype = data.KD_TYPE ;
        $scope.etbnamatype = data.NM_TYPE ;
        $scope.etbnote = data.NOTE ;
        $scope.etbstatus = data.STATUS ;
        $scope.etbcorpid = data.CORP_ID ;

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

myAppModule.controller("EditTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idtipebarang = $routeParams.idtipebarang;
    singleapiService.singlelisttipebarang(idtipebarang)
    .then(function(data)
    {
        $scope.etbid = data.ID ;
        $scope.etbkdtype = data.KD_TYPE ;
        $scope.etbnamatype = data.NM_TYPE ;
        $scope.etbnote = data.NOTE ;
        $scope.etbstatus = data.STATUS ;
        $scope.etbcorpid = data.CORP_ID ;

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

myAppModule.controller("DeleteTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path("/erp/masterbarang/list/tipebarang")
}]);