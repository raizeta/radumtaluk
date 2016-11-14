'use strict';
myAppModule.controller("NOOController",
function ($rootScope,$scope,$location,auth,$window,$filter,$cordovaCamera,$cordovaCapture,CustomerFac,CustomerSqliteFac,focus,StorageService) 
{   
    focus('focusUsername');
    $scope.activenoo  = "active";
    $scope.userInfo = auth;
    $scope.customer = {};
    $scope.customer.ktp     = auth.gambar;
    $scope.customer.npwp    = auth.gambar;
    $scope.customer.siub    = auth.gambar;
    $scope.customer.ttd     = auth.gambar;
    $scope.customer.FS1     = auth.gambar;
    $scope.customer.FS2     = auth.gambar;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

    $scope.ambilgambar = function(value)
    {
        document.addEventListener("deviceready", function () 
        {
            var options = $rootScope.getCameraOptions();
            $cordovaCamera.getPicture(options)
            .then(function (imageData) 
            {
                if(value == 'KTP')
                {
                    $scope.customer.ktp       = imageData;
                    var databerkas            = {};
                    databerkas.gambar         = imageData;
                    databerkas.keterangan     = 'KTP';
                    var datastorage = StorageService.get('berkasstorage');
                    if(datastorage)
                    {
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                    else
                    {
                        var datastorage = [];
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }

                }
                else if(value == 'NPWP')
                {
                    $scope.customer.npwp    = imageData;
                    var databerkas            = {};
                    databerkas.gambar       = imageData;
                    databerkas.keterangan   = 'NPWP';
                    var datastorage = StorageService.get('berkasstorage');
                    if(datastorage)
                    {
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                    else
                    {
                        var datastorage = [];
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                }
                else if(value == 'SIUB')
                {
                    $scope.customer.siub   = imageData;
                    var databerkas            = {};
                    databerkas.gambar = imageData;
                    databerkas.keterangan = 'SIUB';
                    var datastorage = StorageService.get('berkasstorage');
                    if(datastorage)
                    {
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                    else
                    {
                        var datastorage = [];
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }

                }
                else if(value == 'TTD')
                {
                    $scope.customer.ttd   = imageData;
                    var databerkas            = {};
                    databerkas.gambar = imageData;
                    databerkas.keterangan = 'TTD';
                    var datastorage = StorageService.get('berkasstorage');
                    if(datastorage)
                    {
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                    else
                    {
                        var datastorage = [];
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }

                }
                else if(value == 'FS1')
                {
                    $scope.customer.FS1   = imageData;
                    var databerkas            = {};
                    databerkas.gambar = imageData;
                    databerkas.keterangan = 'FS1';
                    var datastorage = StorageService.get('berkasstorage');
                    if(datastorage)
                    {
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                    else
                    {
                        var datastorage = [];
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }

                }
                else if(value == 'FS2')
                {
                    $scope.customer.FS2   = imageData;
                    var databerkas            = {};
                    databerkas.gambar = imageData;
                    databerkas.keterangan = 'FS2';
                    var datastorage = StorageService.get('berkasstorage');
                    if(datastorage)
                    {
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                    else
                    {
                        var datastorage = [];
                        datastorage.push(databerkas);
                        StorageService.set('berkasstorage',datastorage);
                    }
                }   
            }, 
            function(err) 
            {
                $scope.loadingcontent = false;
            });

        }, false);
    }
    
    $scope.submitForm = function(customer)
    {
        var getberkas       = StorageService.get('berkasstorage');
        console.log(getberkas);

        var customer        = customer;
        customer.CUST_GRP   = 'CUS.2016.000637';
        customer.JOIN_DATE  = $filter('date')(new Date(),'yyyy-MM-dd');
        customer.STT_TOKO   = '1';
        customer.CREATED_BY = auth.username;
        CustomerFac.GetLastCustomers()
        .then(function(response)
        {
            var nomorurut = '';
            if(angular.isArray(response) && response.length > 0)
            {
                var kode = response[0].CUST_KD;
                console.log(kode);
                var split = kode.split(".");
                console.log("Index Ke 2 " + Number(split[2]));
                var kodes = Number(split[2]) + 1;
                console.log("Kodes " + kodes);
                var str = "" + kodes;
                var pad = "000000";
                nomorurut   = pad.substring(0, pad.length - str.length) + str;
            }
            console.log("Nomor Urut " + nomorurut);
            customer.CUST_KD = "CUS" + "." + $filter('date')(new Date(),'yyyy') + "." +  nomorurut;
            console.log(customer.CUST_KD);
            CustomerFac.SetCustomers(customer) 
            .then( function(response)
            {
                if(getberkas.length > 0 )
                {
                    angular.forEach(getberkas,function(value,key)
                    {
                        var data = {};
                        data.CUST_KD        = response.CUST_KD;
                        data.IMG_NM_BASE64  = value.gambar;
                        data.DCRIPT         = value.keterangan;
                        data.STATUS         = 1;
                        data.CREATE_AT      = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
                        data.CREATE_BY      = auth.id;

                        CustomerFac.SetCustomersBerkas(data)
                        .then(function(responseberkas)
                        {
                            console.log("Berkas Berhasil Disimpan");
                        },
                        function(error)
                        {
                            alert("Berkas Gagal Disimpan");
                        });
                    });
                }

                focus('focusUsername');
                CustomerSqliteFac.SetCustomers(response)
                .then(function(responselocal)
                {
                    alert("Customer Berhasil Ditambahkan.Terima Kasih!");
                    StorageService.destroy('berkasstorage');
                });
                
                console.log("Sukses");
                $scope.customer = null;

            },
            function(error)
            {
                console.log(error);
                alert("Customer Gagal Ditambahkan.Ulangi Lagi!");
            }); 
        },
        function(error)
        {
            alert("Customer Gagal Ditambahkan.Ulangi Lagi!");
        });       
    }
});



