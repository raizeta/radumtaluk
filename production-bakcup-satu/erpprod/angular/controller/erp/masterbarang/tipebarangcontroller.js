myAppModule.controller("NewTipeBarangController", ["$scope", "$location","$http", "authService", "auth","$window", "ngToast",
function ($scope, $location, $http, authService, auth,$window,ngToast) 
{
    $scope.submitForm = function(tipebarang)
    {
 
            $scope.loading = true; 

            //http://stackoverflow.com/questions/29382004/how-serialize-objects-with-angularjs
            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            var serialized = serializeObj(tipebarang); 

            //##################################################################################

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.post('http://labtest3-api.int/master/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa',serialized,config)
            .success(function(data,status, headers, config) 
            {
                
                // $location.path("/erp/masterbarang/list/tipebarang");
                ngToast.create('Tipe Barang Telah Berhasil Di Simpan');
            })

            .error(function (data, status, header, config) 
            {
                console.log(status);
                console.log(data);
                console.log(header);
                console.log(config);      
            })

            .finally(function()
            {
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

myAppModule.controller("ListTipeBarangController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", "ngToast",
function ($scope, $location, $http, authService, auth,$window,apiService,ngToast) 
{

    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope.page = 1;

    $scope.loadData = function(page)
    {
        apiService.listtipebarang(page)
        .then(function (result) 
        {
            $scope.typebarangs = result.Tipebarang;
            $scope.loading = false;
        }, 

        function (error) 
        {          
            $scope.loadData();   
        });
    }
    
    $scope.loadData($scope.page);

    $scope.nextPage = function()
    {
        $scope.page++;
        $scope.loadData($scope.page++);

    }
    $scope.prevPage = function()
    {
        $scope.page--;
        $scope.loadData($scope.page--);

    }

    $scope.menuOptions = 
    [
        ['View Detail', function ($itemScope) 
        {
            $scope.selected = $itemScope.typebarang.ID;
            $location.path('/erp/masterbarang/detail/tipebarang/'+$scope.selected);
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.typebarang.ID;
            $location.path('erp/masterbarang/edit/tipebarang/'+$scope.selected);
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.typebarang.ID;
            if(confirm("Apakah Anda Yakin Menghapus Unit Barang:" + $scope.selected))
            {
                //$location.path('/erp/masterbarang/delete/barangumum/'+ $scope.selected)
                var config = 
                {
                    headers : 
                    {
                        'Content-Type': 'application/x-www-form-urlencoded', 
                    }
                };

                $http.delete("http://api.lukison.int/master/tipebarangs/"+ $scope.selected,config)
                    .success(function(data,status, headers, config) 
                    {
                        // var index = $scope.typebarangs.indexOf($scope.selected);
                        // $scope.typebarangs.splice(index, 1);
                        $scope.loadData();
                        ngToast.create('Tipe Barang Telah Berhasil Di Delete');
                    })

                    .error(function (data, status, header, config) 
                    {
                        alert("Tidak Berhasil");    
                    })

                    .finally(function()
                    {
                        $scope.loading = false;  
                    });
            }
        }]
    ];

    $scope.updateUser = function(typebarang)
    {
            alert(typebarang.NM_TYPE);       
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

myAppModule.controller("EditTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService","ngToast",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService,ngToast) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idtipebarang = $routeParams.idtipebarang;
    singleapiService.singlelisttipebarang(idtipebarang)
    .then(function(data)
    {
        // $scope.kodetipe = data.KD_TYPE ;
        // $scope.namatipe = data.NM_TYPE ;
        // $scope.catatan = data.NOTE ;
        // $scope.statustipebarang = data.STATUS ;
        // $scope.loading = false;
        $scope.loading = false ;
        $scope.tipebarang = data;
    },
    function(error)
    {

    });

    $scope.submitForm = function(tipebarang)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(tipebarang); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.put("http://labtest3-api.int/master/tipebarangs/"+ idtipebarang +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                ngToast.create('Tipe Barang Telah Berhasil Di Update');
                $location.path("/erp/masterbarang/list/tipebarang");


            })

            .error(function (data, status, header, config) 
            {
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

myAppModule.controller("DeleteTipeBarangController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    var idtipebarang = $routeParams.idtipebarang;

    var config = 
    {
        headers : 
        {
            'Content-Type': 'application/x-www-form-urlencoded', 
        }
    };
    
    $http.delete("http://labtest3-api.int/master/tipebarangs/"+ idtipebarang +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",config)
    .success(function(data,status, headers, config) 
    {
        $location.path("/erp/masterbarang/list/tipebarang");

    })

    .error(function (data, status, header, config) 
    {
        alert("Tidak Berhasil");    
    })

    .finally(function()
    {
        $scope.loading = false;  
    });

 

    //$location.path("/erp/masterbarang/list/tipebarang")
}]);