'use strict';
myAppModule.controller("MgrAproveController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.rejected = 'accept';
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
    if($window.localStorage.getItem('revisiacc'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('revisiacc'));
        $scope.revisimgr = [];
        var totalharga = 0;
        angular.forEach(prevro, function(value, index)
        {
            if(prevro[index].revisiharga != 0)
            {
                var harga  = parseInt(prevro[index].revisiharga);
            }
            else
            {
                var harga  = parseInt(prevro[index].harga);
            }

            if(prevro[index].revisijumlah != 0)
            {
                var jumlah  = parseInt(prevro[index].revisijumlah);
            }
            else
            {
                var jumlah  = parseInt(prevro[index].jumlahorder);
            }
            prevro[index].statusaprove = 'accept';


            prevro[index].revisihargamgr            = 0;
            prevro[index].revisijumlahmgr           = 0;
            prevro[index].itempricereasonmgr        = '';
            prevro[index].rejectedmgr               = 0;
            prevro[index].rejectedreason            = '';
            prevro[index].classjlh                  = 'bg-light-blue';
            prevro[index].classhrg                  = 'bg-light-blue';
            prevro[index].subtotal                  = harga * jumlah;
            $scope.revisimgr.push(prevro[index]);

            var subtotal = harga * jumlah ;
            totalharga = totalharga + subtotal;
        });
        $scope.totalharga = totalharga;
    }
    $scope.mgrrevisiharga=function(barangumum)
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
                var existOrder = _.findWhere($scope.revisimgr, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.classhrg = 'bg-maroon';
                    existOrder.revisihargamgr = inputValue;

                    var total = parseInt($scope.totalharga);
                    var harga = parseInt(existOrder.revisihargamgr);

                    existOrder.subtotal = jlhorder * harga;
                    
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(lastharga * jlhorder);
                    $scope.$apply();
                }
            }
        });
    }
    $scope.mgrrevisijumlah=function(barangumum)
    {
        if(barangumum.revisijumlahmgr == 0)
        {
            if(barangumum.revisijumlah == 0)
            {
                var lastjumlah = parseInt(barangumum.jumlahorder);
            }
            else
            {
                var lastjumlah = parseInt(barangumum.revisijumlah);
            } 
        }
        if(barangumum.revisihargamgr == 0)
        {
            if(barangumum.revisiharga == 0)
            {
                var harga = parseInt(barangumum.harga);
            }
            else
            {
                var harga = parseInt(barangumum.revisiharga);
            }  
        }
        else
        {
            var harga = parseInt(barangumum.revisihargamgr);
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
                var existOrder = _.findWhere($scope.revisimgr, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.classjlh         = 'bg-maroon';
                    existOrder.revisijumlahmgr  = inputValue;
                    var total = parseInt($scope.totalharga);
                    var jlhorder = parseInt(existOrder.revisijumlahmgr);
                    existOrder.subtotal = jlhorder * harga;
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(harga * lastjumlah);
                    $scope.$apply();
                }
            }
        });
    }
    $scope.confirm = function()
    {
        var revisimgr = JSON.stringify($scope.revisimgr);
        $window.localStorage.setItem('revisimgr', revisimgr);
        $window.localStorage.removeItem('revisiacc', revisimgr);
        $location.path("/progress");
    }
}]);

myAppModule.controller("MgrAproveDetailController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.rejected = 'accept';
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    
    if($window.localStorage.getItem('revisiacc'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('revisiacc'));
        $scope.revisimgr = [];
        var totalharga = 0;
        angular.forEach(prevro, function(value, index)
        {
            if(prevro[index].revisiharga != 0)
            {
                var harga  = parseInt(prevro[index].revisiharga);
            }
            else
            {
                var harga  = parseInt(prevro[index].harga);
            }

            if(prevro[index].revisijumlah != 0)
            {
                var jumlah  = parseInt(prevro[index].revisijumlah);
            }
            else
            {
                var jumlah  = parseInt(prevro[index].jumlahorder);
            }
            prevro[index].statusaprove = 'accept';


            prevro[index].revisihargamgr            = 0;
            prevro[index].revisijumlahmgr           = 0;
            prevro[index].itempricereasonmgr        = '';
            prevro[index].rejectedmgr               = 0;
            prevro[index].rejectedreason            = '';
            prevro[index].classjlh                  = 'bg-light-blue';
            prevro[index].classhrg                  = 'bg-light-blue';
            prevro[index].subtotal                  = harga * jumlah;
            $scope.revisimgr.push(prevro[index]);

            var subtotal = harga * jumlah ;
            totalharga = totalharga + subtotal;
        });
        $scope.totalharga = totalharga;
    }
    $scope.mgrrevisiharga=function(barangumum)
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
                var existOrder = _.findWhere($scope.revisimgr, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.classhrg = 'bg-maroon';
                    existOrder.revisihargamgr = inputValue;

                    var total = parseInt($scope.totalharga);
                    var harga = parseInt(existOrder.revisihargamgr);

                    existOrder.subtotal = jlhorder * harga;
                    
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(lastharga * jlhorder);
                    $scope.$apply();
                }
            }
        });
    }
    $scope.mgrrevisijumlah=function(barangumum)
    {
        if(barangumum.revisijumlahmgr == 0)
        {
            if(barangumum.revisijumlah == 0)
            {
                var lastjumlah = parseInt(barangumum.jumlahorder);
            }
            else
            {
                var lastjumlah = parseInt(barangumum.revisijumlah);
            } 
        }
        if(barangumum.revisihargamgr == 0)
        {
            if(barangumum.revisiharga == 0)
            {
                var harga = parseInt(barangumum.harga);
            }
            else
            {
                var harga = parseInt(barangumum.revisiharga);
            }  
        }
        else
        {
            var harga = parseInt(barangumum.revisihargamgr);
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
                var existOrder = _.findWhere($scope.revisimgr, { KD_BARANG: barangumum.KD_BARANG });
                if(existOrder)
                {
                    existOrder.classjlh         = 'bg-maroon';
                    existOrder.revisijumlahmgr  = inputValue;
                    var total = parseInt($scope.totalharga);
                    var jlhorder = parseInt(existOrder.revisijumlahmgr);
                    existOrder.subtotal = jlhorder * harga;
                    $scope.totalharga = parseInt(total + (harga * jlhorder)) - parseInt(harga * lastjumlah);
                    $scope.$apply();
                }
            }
        });
    }
    $scope.confirm = function()
    {
        var revisimgr = JSON.stringify($scope.revisimgr);
        $window.localStorage.setItem('revisimgr', revisimgr);
        $window.localStorage.removeItem('revisiacc', revisimgr);
        $location.path("/progress");
    }
}]);
