myAppModule.controller("NewKategoriController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.submit = function()
    {
        $scope.loading = true;
        var data = $.param({json: JSON.stringify
                ({
                    eknamakategori: $scope.eknamakategori,
                    eknote: $scope.eknote,
                    status: $scope.statuskategori
                })
            });
        console.log(data);

    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("ListKategoriController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.loading  = true;
    $scope.userInfo = auth;
    $http.get('http://api.lukisongroup.com/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.categories = data.Kategori ;

    })

    .error(function (data, status, header, config) 
    {
            
    })

    .finally(function(){
        $scope.loading = false;
    });

    $scope.deletekategori = function(category)
    {
       var id = category.ID;
       var nama = category.NM_KATEGORI;
        if(confirm("Apakah Anda Yakin Menghapus Kategori:" + nama))
        {
            $location.path('/salesman/delete/kategori/'+ id)
        }   
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idkategori = $routeParams.idkategori;
    $http.get('http://api.lukisongroup.com/master/kategoris/'+ $scope.idkategori + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.ekid = data.ID ;
        $scope.ekkdkategori = data.KD_KATEGORI;
        $scope.eknamakategori = data.NM_KATEGORI;
        $scope.eknote = data.NOTE;
        $scope.ekstatus = data.STATUS;
        $scope.ekcorpid = data.CORP_ID;

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

myAppModule.controller("EditKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idkategori = $routeParams.idkategori;
    $http.get('http://api.lukisongroup.com/master/kategoris/'+ $scope.idkategori + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.ekid = data.ID ;
        $scope.ekkdkategori = data.KD_KATEGORI;
        $scope.eknamakategori = data.NM_KATEGORI;
        $scope.eknote = data.NOTE;
        $scope.ekstatus = data.STATUS;
        $scope.ekcorpid = data.CORP_ID;

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

myAppModule.controller("DeleteKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idkategori = $routeParams.idkategori;
    $http.get('http://api.lukisongroup.com/master/kategoris/'+ $scope.idkategori + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.ekid = data.ID ;
        $scope.ekkdkategori = data.KD_KATEGORI;
        $scope.eknamakategori = data.NM_KATEGORI;
        $scope.eknote = data.NOTE;
        $scope.ekstatus = data.STATUS;
        $scope.ekcorpid = data.CORP_ID;

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