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
            console.log($scope.barangumum);
           
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

    $scope.deletebarangumum = function(barangumum)
    {
       var nama = barangumum.NM_BARANG;
       var id = barangumum.ID;
       $window.dialog = new Messi('my message');
 
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
            Messi.alert('my message');
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
        $scope.ebuid = data.ID ;
        $scope.ebukdbarang = data.KD_BARANG ;
        $scope.ebunmbarang = data.NM_BARANG ;
        $scope.ebukdkategori = data.kategori.ID;
        $scope.ebutypebarang = data.type.ID ;
        $scope.ebukdunit = data.unit.ID ;
        $scope.ebukddistributor = data.ID ;
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

        $scope.loading = false;
        
    }, 
    function (error) 
    {          
        $window.alert("Invalid credentials");
        
    });

    apiService.listkategori()
    .then(function (result) 
    {
        $scope.categories = result.Kategori;
        console.log($scope.categories);
        $scope.loading  = false;
       
    });

    apiService.listbarangunit()
    .then(function (result) 
    {
        $scope.unitbarangs = result.Unitbarang;
        $scope.loading = false;
        console.log($scope.unitbarangs);
       
    });

    apiService.listsuplier()
    .then(function (result) 
    {
        $scope.supliers = result.Suplier;
        $scope.loading = false;
        console.log($scope.supliers);
       
    });

    apiService.listtipebarang()
    .then(function (result) 
    {
        $scope.typebarangs = result.Tipebarang;
        $scope.loading = false;
        console.log($scope.typebarangs);
       
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



