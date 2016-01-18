myAppModule.controller("NewKategoriController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.submitForm = function(kategori)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(kategori); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.post("http://labtest3-api.int/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                $location.path("/erp/masterbarang/list/kategori");

            })
            .error(function (data, status, header, config) 
            {
                console.log(data);
                console.log(status);
                console.log(header);
                console.log(config);      
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
            if(confirm("Apakah Anda Yakin Menghapus Unit Barang:" + $scope.selected))
            {
                $location.path('/erp/masterbarang/delete/kategori/'+ $scope.selected)
            }
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
    .then(function(data)
    {
        $scope.kategori = data ;
        $scope.loading = false;
    });

    $scope.submitForm = function(kategori)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(kategori); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.put("http://labtest3-api.int/master/kategoris/"+idkategori+"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                $location.path("/erp/masterbarang/list/kategori");

            })
            .error(function (data, status, header, config) 
            {
                console.log(data);
                console.log(status);
                console.log(header);
                console.log(config);      
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

myAppModule.controller("DeleteKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    var idkategori = $routeParams.idkategori;
    var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.delete("http://labtest3-api.int/master/kategoris/"+idkategori+"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",config)
            .success(function(data,status, headers, config) 
            {
                $location.path("/erp/masterbarang/list/kategori");

            })
            .error(function (data, status, header, config) 
            {
                console.log(data);
                console.log(status);
                console.log(header);
                console.log(config);      
            })

            .finally(function()
            {
                $scope.loading = false;  
            });
}]);