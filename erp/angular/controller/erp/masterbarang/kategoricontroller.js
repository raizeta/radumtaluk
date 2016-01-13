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

myAppModule.controller("ListKategoriController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", function ($scope, $location, $http, authService, auth,$window,apiService) 
{
  $scope.statuses = [
    {value: 1, text: 'Aktif'},
    {value: 2, text: 'Tidak Aktif'}
  ]; 

    $scope.loading  = true;
    $scope.userInfo = auth;
    apiService.listkategori()
    .then(function (result) 
    {
        $scope.categories = result.Kategori;
        console.log($scope.categories);
        $scope.loading  = false;
       
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");
        
    });

    

    $scope.deletekategori = function(category)
    {
       var id = category.ID;
       var nama = category.NM_KATEGORI;
        if(confirm("Apakah Anda Yakin Menghapus Kategori:" + nama))
        {
            $location.path('/erp/masterbarang/delete/kategori/'+ id)
        }   
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.menuOptions = 
    [
        ['View Detail', function ($itemScope) 
        {
            $scope.selected = $itemScope.category.ID;
            $location.path('/erp/masterbarang/detail/kategori/'+$scope.selected);
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.category.ID;
            $location.path('erp/masterbarang/edit/kategori/'+$scope.selected);
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.category.ID;
            alert("Are You Sure To Delete This One? "+ $scope.selected);
        }]
    ];

}]);

myAppModule.controller("DetailKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idkategori = $routeParams.idkategori;
    singleapiService.singlelistkategori(idkategori)
    .then(function(result)
    {
        $scope.ekid = result.ID ;
        $scope.ekkdkategori = result.KD_KATEGORI;
        $scope.eknamakategori = result.NM_KATEGORI;
        $scope.eknote = result.NOTE;
        $scope.ekstatus = result.STATUS;
        $scope.ekcorpid = result.CORP_ID;
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

myAppModule.controller("EditKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idkategori = $routeParams.idkategori;
    singleapiService.singlelistkategori(idkategori)
    .then(function(result)
    {
        $scope.ekid = result.ID ;
        $scope.ekkdkategori = result.KD_KATEGORI;
        $scope.eknamakategori = result.NM_KATEGORI;
        $scope.eknote = result.NOTE;
        $scope.ekstatus = result.STATUS;
        $scope.ekcorpid = result.CORP_ID;
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

myAppModule.controller("DeleteKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path("/erp/masterbarang/list/kategori");
}]);