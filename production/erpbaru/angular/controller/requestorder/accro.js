'use strict';
myAppModule.controller("AccController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
    if($window.localStorage.getItem('set-harga'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('set-harga'));
        $scope.revisiharga = [];
        var totalharga = 0;
        angular.forEach(prevro, function(value, index)
        {
            var harga  = parseInt(prevro[index].harga);
            var jumlah = parseInt(prevro[index].jumlahorder);

            prevro[index].revisiharga           = 0;
            prevro[index].revisijumlah          = 0;
            prevro[index].itempricereason       = 0;
            prevro[index].subtotal              = harga * jumlah;
            $scope.revisiharga.push(prevro[index]);

            var subtotal = harga * jumlah ;
            totalharga = totalharga + subtotal;
        });
        $scope.totalharga = totalharga;
    }

    $scope.setrevisiharga=function(barangumum)
    {
        if(barangumum.revisiharga == 0)
        {
            var lastharga = parseInt(barangumum.harga);
        }
        else
        {
            var lastharga = parseInt(barangumum.revisiharga);
        }

        if(barangumum.revisijumlah == 0)
        {
            var jlhorder = parseInt(barangumum.jumlahorder);
        }
        else
        {
            var jlhorder = parseInt(barangumum.revisijumlah);
        }

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
                var existOrder = _.findWhere($scope.revisiharga, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.revisiharga = inputValue;

                    var total = parseInt($scope.totalharga);
                    var harga = parseInt(existOrder.revisiharga);

                    existOrder.subtotal = jlhorder * harga;
                    
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(jlhorder * lastharga);
                    $scope.$apply();
                }
            }
        });
    }

    $scope.setrevisijumlah=function(barangumum)
    {
        if(barangumum.revisijumlah == 0)
        {
            var lastjumlah = parseInt(barangumum.jumlahorder);
        }
        else
        {
            var lastjumlah = parseInt(barangumum.revisijumlah);
        }
        
        if(barangumum.revisiharga == 0)
        {
            var harga = parseInt(barangumum.harga);
        }
        else
        {
            var harga = parseInt(barangumum.revisiharga);
        }

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
                var existOrder = _.findWhere($scope.revisiharga, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.revisijumlah = inputValue;
                    var total = parseInt($scope.totalharga);
                    var jlhorder = parseInt(existOrder.revisijumlah);
                    existOrder.subtotal = jlhorder * harga;
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(harga * lastjumlah);
                    $scope.$apply();
                }
            }
        });
    }
    $scope.confirm = function()
    {
        var revisiacc = JSON.stringify($scope.revisiharga);
        $window.localStorage.setItem('revisiacc', revisiacc);
        $window.localStorage.removeItem('set-harga', revisiacc);
        $location.path('mgraprove');
    } 
}]);
myAppModule.controller("AccDetailController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
    if($window.localStorage.getItem('set-harga'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('set-harga'));
        $scope.revisiharga = [];
        var totalharga = 0;
        angular.forEach(prevro, function(value, index)
        {
            var harga  = parseInt(prevro[index].harga);
            var jumlah = parseInt(prevro[index].jumlahorder);

            prevro[index].revisiharga           = 0;
            prevro[index].revisijumlah          = 0;
            prevro[index].itempricereason       = 0;
            prevro[index].subtotal              = harga * jumlah;
            $scope.revisiharga.push(prevro[index]);

            var subtotal = harga * jumlah ;
            totalharga = totalharga + subtotal;
        });
        $scope.totalharga = totalharga;
    }

    $scope.setrevisiharga=function(barangumum)
    {
        if(barangumum.revisiharga == 0)
        {
            var lastharga = parseInt(barangumum.harga);
        }
        else
        {
            var lastharga = parseInt(barangumum.revisiharga);
        }

        if(barangumum.revisijumlah == 0)
        {
            var jlhorder = parseInt(barangumum.jumlahorder);
        }
        else
        {
            var jlhorder = parseInt(barangumum.revisijumlah);
        }

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
                var existOrder = _.findWhere($scope.revisiharga, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.revisiharga = inputValue;

                    var total = parseInt($scope.totalharga);
                    var harga = parseInt(existOrder.revisiharga);

                    existOrder.subtotal = jlhorder * harga;
                    
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(jlhorder * lastharga);
                    $scope.$apply();
                }
            }
        });
    }

    $scope.setrevisijumlah=function(barangumum)
    {
        if(barangumum.revisijumlah == 0)
        {
            var lastjumlah = parseInt(barangumum.jumlahorder);
        }
        else
        {
            var lastjumlah = parseInt(barangumum.revisijumlah);
        }
        
        if(barangumum.revisiharga == 0)
        {
            var harga = parseInt(barangumum.harga);
        }
        else
        {
            var harga = parseInt(barangumum.revisiharga);
        }

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
                var existOrder = _.findWhere($scope.revisiharga, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.revisijumlah = inputValue;
                    var total = parseInt($scope.totalharga);
                    var jlhorder = parseInt(existOrder.revisijumlah);
                    existOrder.subtotal = jlhorder * harga;
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(harga * lastjumlah);
                    $scope.$apply();
                }
            }
        });
    }
    $scope.confirm = function()
    {
        var revisiacc = JSON.stringify($scope.revisiharga);
        $window.localStorage.setItem('revisiacc', revisiacc);
        $window.localStorage.removeItem('set-harga', revisiacc);
        $location.path('mgraprove');
    } 
}]);
