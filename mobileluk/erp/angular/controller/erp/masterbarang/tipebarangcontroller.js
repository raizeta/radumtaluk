myAppModule.controller("NewTipeBarangController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
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
            return true;
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

myAppModule.controller("ListTipeBarangController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.loading  = true;
    $scope.userInfo = auth;
    $http.get('http://api.lukisongroup.com/master/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.typebarangs = data.Tipebarang ;
    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function(){
        $scope.loading = false;
    });

    $scope.deletetipebarang = function(typebarang)
    {
       var id = typebarang.ID;
       var nama = typebarang.NM_TYPE;
        if(confirm("Apakah Anda Yakin Menghapus Type Barang:" + nama))
        {
            $location.path('/salesman/delete/tipebarang/'+ id)
        }   
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idtipebarang = $routeParams.idtipebarang;
    $http.get('http://api.lukisongroup.com/master/tipebarangs/'+ $scope.idtipebarang + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.etbid = data.ID ;
        $scope.etbkdtype = data.KD_TYPE ;
        $scope.etbnamatype = data.NM_TYPE ;
        $scope.etbnote = data.NOTE ;
        $scope.etbstatus = data.STATUS ;
        $scope.etbcorpid = data.CORP_ID ;
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

myAppModule.controller("EditTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idtipebarang = $routeParams.idtipebarang;
    $http.get('http://api.lukisongroup.com/master/tipebarangs/'+ $scope.idtipebarang + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.etbid = data.ID ;
        $scope.etbkdtype = data.KD_TYPE ;
        $scope.etbnamatype = data.NM_TYPE ;
        $scope.etbnote = data.NOTE ;
        $scope.etbstatus = data.STATUS ;
        $scope.etbcorpid = data.CORP_ID ;
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

myAppModule.controller("DeleteTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idtipebarang = $routeParams.idtipebarang;
    $http.get('http://api.lukisongroup.com/master/tipebarangs/'+ $scope.idtipebarang + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.etbid = data.ID ;
        $scope.etbkdtype = data.KD_TYPE ;
        $scope.etbnamatype = data.NM_TYPE ;
        $scope.etbnote = data.NOTE ;
        $scope.etbstatus = data.STATUS ;
        $scope.etbcorpid = data.CORP_ID ;
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