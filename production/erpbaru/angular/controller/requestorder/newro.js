'use strict';
myAppModule.controller("NewROController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet","UserService", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet,UserService) 
{   
    $scope.userInfo = auth;
	$scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

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

    if($window.localStorage.getItem('product-order'))
    {
        var productorder = JSON.parse($window.localStorage.getItem('product-order'));
        $scope.products  = productorder;
    }
    else
    {
        ProductService.GetProducts()
        .then(function (result) 
        {
            $scope.products = result.BarangUmums;
            $scope.loading = true;
        });
    }  
    
    $scope.addtocart = function(barangumum)
    {
        sweet.show(
        {
            title: barangumum.NM_BARANG,
            // text: barangumum.KD_BARANG,
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: false,
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
            
            // Jika Tombol Cancel Di Click
            if (inputValue === false)
            {
                return false;
            }
            // End Jika Tombol Cancle Di Click


            if ( (inputValue === '') || (bukannumber === false ) )
            {
                sweet.showInputError('Ini Harus Diisi Dan Harus Angka!');
                return false;
            }
            else
            {
                var products = _.findWhere($scope.products, { NM_BARANG: barangumum.NM_BARANG });
                products.incart = inputValue;

                var productorder = JSON.stringify($scope.products);
                $window.localStorage.setItem('product-order', productorder);

                var existingFilter = _.findWhere($rootScope.keranjangbelanja, { NM_BARANG: barangumum.NM_BARANG });
                if(existingFilter)
                {
                    existingFilter.jumlahorder = inputValue;
                }
                else
                {
                    barangumum.jumlahorder = inputValue;
                    $rootScope.keranjangbelanja.push(barangumum);
                }
                

                sweet.show
                ({
                    title: 'Saved',
                    type: 'success',
                    timer: 200,
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
        $scope.keranjangbelanja = prevro;
        $rootScope.jumlahitem = prevro.length;
    }

    if($window.localStorage.getItem('product-order'))
    {
        var productorders       = JSON.parse($window.localStorage.getItem('product-order'));
        $scope.productorders    = productorders;
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
                var existingCustomer = _.findWhere($scope.keranjangbelanja, { KD_BARANG: barangumum.KD_BARANG });
                if(existingCustomer)
                {
                    existingCustomer.jumlahorder = inputValue;
                    $scope.$apply();
                }
                var requestorder = JSON.stringify($scope.keranjangbelanja);
                $window.localStorage.setItem('request-order', requestorder);

                var productorder = _.findWhere($scope.productorders, { KD_BARANG: barangumum.KD_BARANG });
                if(productorder)
                {
                    productorder.incart = inputValue;
                }
                var productorders = JSON.stringify($scope.productorders);
                $window.localStorage.setItem('product-order', productorders); 
            }
        });
    }

    $scope.delete=function(barangumum)
    {
        $scope.keranjangbelanja = _.without($scope.keranjangbelanja,barangumum);
        $rootScope.jumlahitem = $scope.keranjangbelanja.length;

        var requestorder = JSON.stringify($scope.keranjangbelanja);
        $window.localStorage.setItem('request-order', requestorder);

        var productorder = _.findWhere($scope.productorders, { KD_BARANG: barangumum.KD_BARANG });
        if(productorder)
        {
            productorder.incart = null;
        }
        var productorders = JSON.stringify($scope.productorders);
        $window.localStorage.setItem('product-order', productorders); 
    }
}]);

myAppModule.controller("SetHargaController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","UserService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,UserService,sweet) 
{   
    UserService.GetUsers()
    .then(function (result)
    {
        $scope.employes = result.MiniEmploye;
    });

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
        $scope.keranjangbelanja = [];
        $scope.total = 0;
        angular.forEach(prevro, function(value, index)
        {
            prevro[index].harga = 0;
            prevro[index].revisihargamgr            = 0;
            prevro[index].revisijumlahmgr           = 0;
            prevro[index].revisiharga               = 0;
            prevro[index].revisijumlah              = 0;
            $scope.keranjangbelanja.push(prevro[index]);
        });
    }

    $scope.setharga=function(barangumum)
    {
        var lastharga = parseInt(barangumum.harga);
        sweet.show(
        {
            title: barangumum.NM_BARANG,
            type: 'input',
            showCancelButton: true,
            closeOnConfirm: true,
            animation: false,
            inputPlaceholder: 'SET HARGA',
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
                var existOrder = _.findWhere($scope.keranjangbelanja, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.harga = inputValue;
                    var total = parseInt($scope.total);
                    var harga = parseInt(existOrder.harga);
                    var jlhorder = parseInt(existOrder.jumlahorder);
                    $scope.total = parseInt(total + (harga * jlhorder)) - parseInt(jlhorder * lastharga);
                    $scope.$apply();
                }
            }
        });
    }

    $scope.confirm = function(acc_accby)
    {
        console.log(acc_accby);
        var errorvalidasi = [];
        angular.forEach($scope.keranjangbelanja, function(value, index)
        {
            var harga = $scope.keranjangbelanja[index].harga;
            if(harga == 0)
            {
                errorvalidasi.push($scope.keranjangbelanja[index]);
            }
        });
        if(errorvalidasi.length > 0)
        {
            alert("Harga Untuk Setiap Item Belum Lengkap");
        }
        else if(acc_accby == undefined)
        {
            alert("ACC Tidak Boleh Kosong");
        }
        else
        {
            var str = "" + 1;
            var pad = "0000";
            var ans = pad.substring(0, pad.length - str.length) + str;


            var requestorderheaders                 = [];
            var requestorderheader                  = {};
            requestorderheader.noresi               = ans;
            requestorderheader.owner                = auth.username;
            requestorderheader.acc_accby            = acc_accby;
            requestorderheader.acc_mgrby            = '';
            requestorderheader.create_at            = $rootScope.waktuharini;
            requestorderheader.acc_at               = '';
            requestorderheader.mgracc_at            = '';
            requestorderheader.status               = 1;
            requestorderheaders.push(requestorderheader);

            var setheader = JSON.stringify(requestorderheaders);
            $window.localStorage.setItem('ro-headers', setheader);

            angular.forEach($scope.keranjangbelanja, function(value, index)
            {
                $scope.keranjangbelanja[index].noresi = acc_accby;
            });

            var setharga  = JSON.stringify($scope.keranjangbelanja);
            $window.localStorage.setItem('set-harga', setharga);
            $window.localStorage.removeItem('request-order', setharga);
            $window.localStorage.removeItem('product-order', setharga);
            $location.path('progress');            
        }
    }
}]);
