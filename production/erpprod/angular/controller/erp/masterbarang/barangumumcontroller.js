myAppModule.controller("NewBarangUmumController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{

    $scope.parentchange = function()
    {
        $scope.filterparent = parseInt($scope.barangumum.PARENT);
    }
    $scope.corpchange = function()
    {
        $scope.filtercorp = $scope.barangumum.KD_CORP;
    }
    $scope.tipechange = function()
    {
        $scope.filtertipe = $scope.barangumum.KD_TYPE;
    }

    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope.select2Options = 
    {
        allowClear:true
    };

    $scope.parents = 
    [
        {
            "id":0,
            "nama":"Barang Umums",
        },
        {
            "id":1,
            "nama":"Barang Products",
        }
    ];
    console.log($scope.parents);
    var len = apiService.listkategori()
    .then(function (result) 
    {
        // alert((result.Kategori).length-1);
        $scope.categories = result.Kategori;
        console.log($scope.categories);
        $scope.loading  = false;
        // console.log(result.Kategori[10]);
    });


    apiService.listbarangunit()
    .then(function (result) 
    {
        $scope.unitbarangs = result.Unitbarang;
        // var length = ($scope.unitbarangs).length;
        // console.log($scope.unitbarangs[length]);  
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

    apiService.listperusahaan()
    .then(function (result) 
    {
        $scope.perusahaans = result.Perusahaan;    
    });

    $scope.submitForm = function(barangumum)
    {
             $scope.loading = true; 
             apiService.listbarangumum()
            .then(function (result) 
            {
                if((result.BarangUmums).length)
                {
                    var len = (result.BarangUmums).length-1;
                    var kode = result.BarangUmums[len].KD_BARANG;
                    var split = kode.split(".");
                    var kodes = parseInt(split[5]) + 1;
                    var str = "" + kodes;
                    var pad = "0000";
                    var ans = pad.substring(0, pad.length - str.length) + str;
                }
                else
                {
                    var str = "" + 1;
                    var pad = "0000";
                    var ans = pad.substring(0, pad.length - str.length) + str;
                }

                var parent = parseInt(barangumum.PARENT);
                
                if (parent === 0)
                {
                    barangumum.KD_BARANG = 'UM.' + barangumum.KD_CORP + '.' + barangumum.KD_TYPE + '.' + barangumum.KD_KATEGORI + '.' + barangumum.KD_UNIT + '.' + ans;
                
                }
                else if (parent === 1)
                {
                    barangumum.KD_BARANG = 'BRGU.' + barangumum.KD_CORP + '.' + barangumum.KD_TYPE + '.' + barangumum.KD_KATEGORI + '.' + barangumum.KD_UNIT + '.' + ans;  
                }

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
                
                $http.post("http://lukison.int/master/barangumums",serialized,config)
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
               
            });

            // barangumum.KD_BARANG = 'BRGU.' + barangumum.KD_CORP + '.' + barangumum.KD_KATEGORI + '.' + barangumum.KD_TYPE + '.' + barangumum.KD_UNIT + '.0000';
            // function serializeObj(obj) 
            // {
            //   var result = [];
            //   for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
            //   return result.join("&");
            // }
            
            // var serialized = serializeObj(barangumum); 

            // var config = 
            // {
            //     headers : 
            //     {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
            //     }
            // };
            
            // $http.post("http://labtest3-api.int/master/barangumums?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            // .success(function(data,status, headers, config) 
            // {
            //     $location.path("/erp/masterbarang/list/barangumum");

            // })
            // .error(function (data, status, header, config) 
            // {
            //     console.log(data);
            //     console.log(status);
            //     console.log(header);
            //     console.log(config);      
            // })

            // .finally(function()
            // {
            //     $scope.loading = false;  
            // });
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
    $scope.loaddata = function()
    {
        apiService.listbarangumum()
        .then(function (result) 
        {
            $scope.barangumums = result.BarangUmums;
            $scope.loading = false;  
        });
    }
    $scope.loaddata();

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


    // $interval(function()
    //     {
    //         $scope.barangumum()
    //     }
    //     , 10000000000);



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
                //$location.path('/erp/masterbarang/delete/barangumum/'+ $scope.selected)

                var config = 
                        {
                            headers : 
                            {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                                
                            }
                        };
                        
                $http.delete("http://labtest3-api.int/master/barangumums/"+ $scope.selected +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",config)
                .success(function(data,status, headers, config) 
                {
                        $scope.loaddata();
                })

                .finally(function()
                {
                    $scope.loading = false;  
                });
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
    $scope.parents = 
    [
        {
            "id":0,
            "nama":"Barang Umums",
        },
        {
            "id":1,
            "nama":"Barang Products",
        }
    ];    

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

    apiService.listperusahaan()
    .then(function (result) 
    {
        $scope.perusahaans = result.Perusahaan;    
    });
    
    $scope.submitForm = function(barangumum)
    {
            $scope.loading = true;
            var temp_kdbarang = barangumum.KD_BARANG;
            var split = temp_kdbarang.split(".");
            var kodebarang = split[5];
            var parent = parseInt(barangumum.PARENT);
            if (parent === 0)
            {
                barangumum.KD_BARANG = 'UM.' + barangumum.KD_CORP + '.' + barangumum.KD_TYPE + '.' + barangumum.KD_KATEGORI + '.' + barangumum.KD_UNIT + '.' + kodebarang;
            
            }
            else if (parent === 1)
            {
                barangumum.KD_BARANG = 'BRGU.' + barangumum.KD_CORP + '.' + barangumum.KD_TYPE + '.' + barangumum.KD_KATEGORI + '.' + barangumum.KD_UNIT + '.' + kodebarang;  
            }
            
            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            var data = serializeObj(barangumum); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.put("http://lukison.int/master/barangumums/"+ idbarangumum ,data,config)
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



