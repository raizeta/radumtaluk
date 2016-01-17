myAppModule.controller("NewBarangUmumController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{

    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope.select2Options = 
    {
        allowClear:true
    };
    
    apiService.listkategori()
    .then(function (result) 
    {
        $scope.categories = result.Kategori;
        $scope.loading  = false;   
    });

    apiService.listbarangunit()
    .then(function (result) 
    {
        $scope.unitbarangs = result.Unitbarang;  
    });

    apiService.listsuplier()
    .then(function (result) 
    {
        $scope.supliers = result.Suplier;
    });
    apiService.listtipebarang()
    .then(function (result) 
    {
        $scope.typebarangs = result.Tipebarang;    
    });

    $scope.submitForm = function(barangumum)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(barangumum); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.post("http://labtest3-api.int/master/barangumums?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                $location.path("/erp/masterbarang/list/barangumum");

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

myAppModule.controller("ListBarangUmumController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner","apiService","$interval",
function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner,apiService,$interval) 
{
    
    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope. barangumum = function()
    {
        $scope.loading  = true;
        apiService.listbarangumum()
        .then(function (result) 
        {
            $scope.barangumums = result.BarangUmum;
            $scope.loading = false;
           
        }, 
        function (error) 
        {          
            $window.alert("Invalid credentials");    
        });
    }

    $scope.barangumum();

    apiService.listtipebarang()
    .then(function (result) 
    {
        $scope.typebarangs = result.Tipebarang;    
    });
    
    apiService.listkategori()
    .then(function (result) 
    {
        $scope.categories = result.Kategori;
        $scope.loading  = false;
       
    });


    $interval(function()
        {
            $scope.barangumum()
        }
        , 10000000000);



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
            $scope.selected = $itemScope.barangumum.ID;
            $location.path('/erp/masterbarang/detail/barangumum/'+$scope.selected);
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.barangumum.ID;
            $location.path('erp/masterbarang/edit/barangumum/'+$scope.selected);
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.barangumum.ID;
            if(confirm("Apakah Anda Yakin Menghapus Unit Barang:" + $scope.selected))
            {
                $location.path('/erp/masterbarang/delete/barangumum/'+ $scope.selected)
            }
        }]
    ];
}]);

myAppModule.controller("DetailBarangUmumController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{

//http://api.lukisongroup.com/master/tipebarangs/1?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idbarangumum = $routeParams.idbarangumum;
    singleapiService.singlelistbarangumum(idbarangumum)
    .then(function (data) 
    {
        $scope.data = data;
        $scope.loading = false;
        
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");
        
    });

    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("EditBarangUmumController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","apiService","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,apiService,singleapiService) 
{
    $scope.select2Options = {
        allowClear:true
    };
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idbarangumum = $routeParams.idbarangumum;
    singleapiService.singlelistbarangumum(idbarangumum)
    .then(function (data) 
    {
        $scope.barangumum = data;
        $scope.loading = false;
        
    });

    apiService.listkategori()
    .then(function (result) 
    {
        $scope.categories = result.Kategori;
        $scope.loading  = false;
       
    });

    apiService.listbarangunit()
    .then(function (result) 
    {
        $scope.unitbarangs = result.Unitbarang;
        $scope.loading = false;
    });

    apiService.listsuplier()
    .then(function (result) 
    {
        $scope.supliers = result.Suplier;
        $scope.loading = false;     
    });

    apiService.listtipebarang()
    .then(function (result) 
    {
        $scope.typebarangs = result.Tipebarang;
        $scope.loading = false;     
    });

    $scope.submitForm = function(barangumum)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(barangumum); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.put("http://labtest3-api.int/master/barangumums/"+ idbarangumum +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                $location.path("/erp/masterbarang/list/barangumum");

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


myAppModule.controller("DeleteBarangUmumController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{

    var idbarangumum = $routeParams.idbarangumum;
    var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
    $http.delete("http://labtest3-api.int/master/barangumums/"+ idbarangumum +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",config)
    .success(function(data,status, headers, config) 
    {
        $location.path("/erp/masterbarang/list/barangumum");

    })

    .finally(function()
    {
        $scope.loading = false;  
    });

}]);



