'use strict';
myAppModule.controller("NewROController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    ProductService.GetProducts()
    .then(function (result) 
    {
        $scope.products = result.BarangUmums;
        $scope.loading = true;
    });
    TipeBarangService.GetTipeBarangs()
    .then(function (result)
    {
        $scope.tipebarangs = result.Tipebarang;
    });
    UnitBarangService.GetUnitBarangs()
    .then(function (result)
    {
        $scope.unitbarangs = result.Unitbarang;
    });
    CategoryService.GetCategorys()
    .then(function (result)
    {
        $scope.categories = result.Kategori;
    });
    if($window.localStorage.getItem('request-order'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('request-order'));
        $rootScope.keranjangbelanja = prevro;
        $rootScope.jumlahitem = $rootScope.keranjangbelanja.length;
    }
    else
    {
        $rootScope.keranjangbelanja = [];
        $rootScope.jumlahitem = $rootScope.keranjangbelanja.length;
    }  
    
    $scope.addtocart = function(barangumum)
    {
        
        console.log(barangumum);
        sweet.show(
        {
            title: barangumum.NM_BARANG,
            // text: barangumum.KD_BARANG,
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: true,
            animation: false,
            inputPlaceholder: barangumum.unit.NM_UNIT
        }, 
        function(inputValue) 
        {
            if(/^\d+$/.test(inputValue))
            {
                
            }
            else
            {
                var bukannumber = false;
            }

            if (inputValue === false)
            {
                return false;
            }

            if ( (inputValue === '') || (bukannumber === false ) )
            {
                sweet.showInputError('Ini Harus Diisi Dan Harus Angka!');
                return false;
            }
            
            else
            {
                barangumum.jumlahorder = inputValue;
                $scope.keranjangbelanja.push(barangumum);
                sweet.show
                ({
                    title: 'Saved',
                    type: 'success',
                    timer: 20,
                    showConfirmButton: false
                });
                var requestorder = JSON.stringify($rootScope.keranjangbelanja);
                $window.localStorage.setItem('request-order', requestorder);
                $rootScope.jumlahitem = $rootScope.keranjangbelanja.length;
                $scope.$apply();
            }
        });  
    }
}]);
myAppModule.controller("PreviewController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    if($window.localStorage.getItem('request-order'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('request-order'));
        $scope.products = prevro;
        $rootScope.jumlahitem = prevro.length;
    }
    $scope.edit=function(barangumum)
    {
        sweet.show(
        {
            title: barangumum.NM_BARANG,
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: true,
            animation: false,
            inputPlaceholder: barangumum.unit.NM_UNIT
        }, 
        function(inputValue = barangumum.jumlahorder) 
        {
            if(/^\d+$/.test(inputValue))
            {
                
            }
            else
            {
                var bukannumber = false;
            }

            if (inputValue === false)
            {
                return false;
            }

            if ( (inputValue === '') || (bukannumber === false ) )
            {
                sweet.showInputError('Ini Harus Diisi Dan Harus Angka!');
                return false;
            }
            
            else
            {
                var existingCustomer = _.findWhere($scope.products, { KD_BARANG: barangumum.KD_BARANG });
                if(existingCustomer)
                {
                    existingCustomer.jumlahorder = inputValue;
                    $scope.$apply();
                }
                var requestorder = JSON.stringify($scope.products);
                $window.localStorage.setItem('request-order', requestorder); 
            }
        });
    }
    $scope.delete=function(barangumum)
    {
        $scope.products = _.without($scope.products,barangumum);
        $rootScope.jumlahitem = $scope.products.length;
        var requestorder = JSON.stringify($scope.products);
        $window.localStorage.setItem('request-order', requestorder);
    }   
}]);