myAppModule.controller("NewKategoriController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{

    $scope.userInfo = auth;

    $scope.submitForm = function(kategori)
    {
            $scope.loading = true; 
            apiService.listkategori()
            .then(function (result) 
            {
                if((result.Kategori).length)
                {
                    var len = (result.Kategori).length-1;
                    var kode = result.Kategori[len].KD_KATEGORI;
                    var kodes = parseInt(kode) + 1;
                    var str = "" + kodes;
                    var pad = "00";
                    var ans = pad.substring(0, pad.length - str.length) + str;
                    kategori.KD_KATEGORI = ans;
                }
                else
                {
                    var str = "" + 1;
                    var pad = "00";
                    var ans = pad.substring(0, pad.length - str.length) + str;
                    kategori.KD_KATEGORI = ans;
                }
                
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
                
                $http.post("http://labtest3-api.int/master/kategoris",serialized,config)
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
               
            });
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);

myAppModule.controller("ListKategoriController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{
  $scope.statuses = [
    {value: 1, text: 'Aktif'},
    {value: 2, text: 'Tidak Aktif'}
  ]; 

    $scope.loading  = true;
    $scope.userInfo = auth;

    $scope.loadData = function()
    {
        apiService.listkategori()
        .then(function (result) 
        {
            $scope.categories = result.Kategori;
            $scope.loading  = false;
           
        }, 
        function (error) 
        {          
            $scope.loadData();
            
        });
    }
    
    $scope.loadData();

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
                var config = 
                    {
                        headers : 
                        {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                            
                        }
                    };
                    
                    $http.delete("http://labtest3-api.int/master/kategoris/"+$scope.selected,config)
                    .success(function(data,status, headers, config) 
                    {
                        $scope.loadData();

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

myAppModule.controller("EditKategoriController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", "ngToast",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService,ngToast) 
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
            
            $http.put("http://labtest3-api.int/master/kategoris/"+idkategori,serialized,config)
            .success(function(data,status, headers, config) 
            {
                ngToast.create('Kategori Barang Telah Berhasil Di Update');
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
            
            $http.delete("http://labtest3-api.int/master/kategoris/"+idkategori,config)
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