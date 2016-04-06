myAppModule.controller("NewCustomerController", ["$scope", "$location","$http", "authService", "auth","$window","apiService","singleapiService",
function ($scope, $location, $http, authService, auth,$window,apiService,singleapiService) 
{

    $scope.userInfo = auth;
    apiService.listparentcustomerkategoris()
    .then(function (result) 
    {
        $scope.customerkategoris = result.CustomKategori;
        $scope.loading  = false;
    });

    apiService.listprovinsi()
    .then(function (result) 
    {
        $scope.provinsis = result.Provinsi;
    });

    // apiService.listkabupaten()
    // .then(function (result) 
    // {
    //     $scope.kabupatens = result.Kabupaten;
    // });

    // $http.get('angular/json/kecamatan.json').
    // success(function(data, status, headers, config) 
    // {
    //   //$scope.kecamatans = data.Kecamatan;
    //   console.log('Success');
    // });

    apiService.listdistributor()
    .then(function (result) 
    {
        $scope.distributors = result.Distributor;
    });
    
    $scope.groupparentchange = function()
    {
        $scope.filtergroupcust = $scope.customer.CUST_KTG_PARENT; 
        var idparent = $scope.filtergroupcust;
        $scope.loading  = true;
        apiService.listchildcustomerkategoris(idparent)
        .then(function (result) 
        {
            $scope.tena =true;
            $scope.childcustomerkategoris = result.CustomKategori;
            $scope.loading  = false;
        });
    }

    $scope.provinsichange = function()
    {
        $scope.loading = true;
        $scope.filterprovinsi = $scope.customer.PROVINCE_ID;
        var idprovinsi = $scope.filterprovinsi;
        singleapiService.singlelistkabupaten(idprovinsi)
        .then(function (result) 
        {
            $scope.showkabupaten = true;
            $scope.kabupatens = result.Kabupaten;
            console.log($scope.kabupatens);
            $scope.loading = false;
        });
    }

    $scope.kabupatenchange = function()
    {
        $scope.showkodepos = true;
    }

    $scope.kodeposchange = function()
    {
        $scope.showalamat = true;
    }

    $scope.submitForm = function(customer)
    {
            $scope.loading =true;

             apiService.listcustomers()
            .then(function (result) 
            {
                if((result.Customer).length)
                {
                    var len = (result.Customer).length-1;
                    var kode = result.Customer[len].CUST_KD;
                    var split = kode.split(".");
                    var kodes = parseInt(split[3]) + 1;
                    var str = "" + kodes;
                    var pad = "000000000";
                    var nomorurut   = pad.substring(0, pad.length - str.length) + str;
                }
                else
                {
                    var str = "" + 1;
                    var pad = "000000000";
                    var nomorurut   = pad.substring(0, pad.length - str.length) + str;
                }
                
                var kodeprov    = customer.PROVINCE_ID;
                var strprov = "" + kodeprov;
                var padprov = "00";
                var kodeprovinsi   = padprov.substring(0, padprov.length - strprov.length) + strprov;


                var kodepos     = customer.POSTAL_CODE 

                var kodedis     = customer.KD_DISTRIBUTOR;
                var kodedist    = kodedis.split(".");
                var kodedistributor = kodedist[1];

                customer.CUST_KD = "CUS" + "." + kodedistributor + "." +  kodeprovinsi + "." + kodepos + "." +  nomorurut;
                customer.CUST_GRP = "PARENT";
                function serializeObj(obj) 
                {
                  var result = [];
                  for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
                  return result.join("&");
                }
                
                var serialized = serializeObj(customer); 

                var config = 
                {
                    headers : 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                        
                    }
                };
                
                $http.post("http://lukison.int/master/customers",serialized,config)
                .success(function(data,status, headers, config) 
                {
                    $location.path("/erp/masterbarang/list/customer");

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

myAppModule.controller("ListCustomerController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner", "apiService",
function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner,apiService) 
{  
    $scope.loading  = true;
    $scope.userInfo = auth;

    apiService.listcustomers()
    .then(function (result) 
    {
        $scope.customers = result.Customer;
        $scope.loading  = false;
    });



    $scope.menuOptions = 
    [
        ['View Detail', function ($itemScope) 
        {
            $scope.selected = $itemScope.customer.CUST_KD;
            $location.path('/erp/masterbarang/detail/customer/'+$scope.selected);
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.customer.CUST_KD;
            $location.path('erp/masterbarang/edit/customer/'+$scope.selected);
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.customer.CUST_KD;
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
                        $scope.loadData();
                })

                .finally(function()
                {
                    $scope.loading = false;  
                });
            }
        }]
    ];

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", "apiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,apiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idcustomer = $routeParams.idcustomer;
    $http.get('')
    .success(function(data,status, headers, config) 
    {

        
    })

    .error(function (data, status, header, config) 
    {
           $location.path('/error/404');
    }).

    finally(function()
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

myAppModule.controller("EditCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","apiService","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,apiService,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;

    var idcustomer = $routeParams.idcustomer;
    singleapiService.singlelistcustomer(idcustomer)
    .then(function (data) 
    {
        $scope.filtergroupcust = data.PROVINCE_ID;
        $scope.customer = data;
        $scope.loading = false;
    });

    apiService.listparentcustomerkategoris()
    .then(function (result) 
    {
        $scope.customerkategoris = result.CustomKategori;
        $scope.loading  = false;
    });
    
    // apiService.listcustomerkategoris()
    // .then(function (result) 
    // {
    //     $scope.customerkategoris = result.Customerkategori;
    // });

    apiService.listprovinsi()
    .then(function (result) 
    {
        $scope.provinsis = result.Provinsi;
    });

    apiService.listkabupaten()
    .then(function (result) 
    {
        $scope.kabupatens = result.Kabupaten;
    });

    apiService.listdistributor()
    .then(function (result) 
    {
        $scope.distributors = result.Distributor;
    });

    $scope.groupparentchange = function()
    {
        $scope.filtergroupcust = $scope.customer.CUST_KTG_PARENT;
    }

    $scope.provinsichange = function()
    {
        $scope.filterprovinsi = $scope.customer.PROVINCE_ID;
    }

    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);

myAppModule.controller("DeleteCustomerController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    // $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.iddistributor = $routeParams.iddistributor;
    
    alert($scope.iddistributor);
    
    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);



