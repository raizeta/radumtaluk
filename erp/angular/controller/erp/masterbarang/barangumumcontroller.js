myAppModule.controller("NewBarangUmumController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $http.get('http://api.lukisongroup.com/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.categories = data.Kategori ;

    })
    .error(function (data, status, header, config) 
    {
        alert("Tidak Bisa Mendapatkan Data Kategori");    
    });

    $http.get('http://api.lukisongroup.com/master/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.typebarangs = data.Tipebarang ;
    })

    .error(function (data, status, header, config) 
    {
            
    });

    $http.get('http://api.lukisongroup.com/master/supliers?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.supliers = data.Suplier ;
    });

    $http.get('http://api.lukisongroup.com/master/unitbarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.unitbarangs = data.Unitbarang ;
    });

    $scope.submitForm = function(barangumum)
    {
        $scope.barangumum = angular.copy(barangumum);
        var gambarbarang =$scope.barangumum.file.base64;
        var namabarang = $scope.barangumum.namaproduct;
        var suplier = $scope.barangumum.suplier;
        var kategori = $scope.barangumum.kategori;
        var typebarang = $scope.barangumum.typebarang;
        var unitbarang = $scope.barangumum.unitbarang;
        var quantity = $scope.barangumum.quantity;
        $scope.loading =true;
    }


    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }   
}]);

myAppModule.controller("ListBarangUmumController", ["$scope", "$location","$http", "authService", "auth","$window","$cordovaBarcodeScanner","apiService", function ($scope, $location, $http, authService, auth,$window,$cordovaBarcodeScanner,apiService) 
{
    
    $scope.loading  = true;
    $scope.userInfo = auth;
    apiService.listbarangumum()
    .then(function (result) 
    {
        $scope.barangumum = result;
        $scope.loading = false;
        console.log($scope.barangumum);
       
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");    
    });


    $scope.deletebarangumum = function(barangumum)
    {
       var nama = barangumum.NM_BARANG;
       var id = barangumum.ID;
        if(confirm("Apakah Anda Yakin Menghapus Barang Umum:" + nama))
        {
                $cordovaBarcodeScanner
                  .scan()
                  .then(function(barcodeData) {
                    // Success! Barcode data is here
                  }, function(error) {
                    // An error occurred
                  });
        }   
    }

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DetailBarangUmumController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idbarangumum = $routeParams.idbarangumum;
    apiService.singlelistbarangumum(idbarangumum)
    .then(function (result) 
    {
        $scope.ebuid = data.ID ;
        $scope.ebukdbarang = data.KD_BARANG ;
        $scope.ebunmbarang = data.NM_BARANG ;
        $scope.ebukdkategori = data.kategori.NM_KATEGORI;
        $scope.ebutypebarang = data.type.NM_TYPE ;
        $scope.ebukdunit = data.unit.NM_UNIT ;
        $scope.ebukddistributor = data.KD_DISTRIBUTOR ;
        $scope.ebuparent = data.PARENT ;
        $scope.ebuhpp = data.HPP ;
        $scope.ebuharga = data.HARGA ;
        $scope.ebubarcode = data.BARCODE ;
        $scope.ebuimage = data.IMAGE;
        $scope.ebunote = data.NOTE  ;
        $scope.ebukdcorp = data.KD_CORP ;
        $scope.ebukdcab = data.KD_CAB ;
        $scope.ebukddep = data.KD_DEP ;
        $scope.ebustatus = data.STATUS ;
        
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

myAppModule.controller("EditBarangUmumController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idbarangumum = $routeParams.idbarangumum;
    apiService.singlelistbarangumum(idbarangumum)
    .then(function (data) 
    {
        $scope.ebuid = data.ID ;
        $scope.ebukdbarang = data.KD_BARANG ;
        $scope.ebunmbarang = data.NM_BARANG ;
        $scope.ebukdkategori = data.kategori.NM_KATEGORI;
        $scope.ebutypebarang = data.type.NM_TYPE ;
        $scope.ebukdunit = data.unit.NM_UNIT ;
        $scope.ebukddistributor = data.KD_DISTRIBUTOR ;
        $scope.ebuparent = data.PARENT ;
        $scope.ebuhpp = data.HPP ;
        $scope.ebuharga = data.HARGA ;
        $scope.ebubarcode = data.BARCODE ;
        $scope.ebuimage = data.IMAGE;
        $scope.ebunote = data.NOTE  ;
        $scope.ebukdcorp = data.KD_CORP ;
        $scope.ebukdcab = data.KD_CAB ;
        $scope.ebukddep = data.KD_DEP ;
        $scope.ebustatus = data.STATUS ;
        
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

myAppModule.controller("DeleteBarangUmumController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    $location.path("/erp/masterbarang/list/barangumum")
}]);



