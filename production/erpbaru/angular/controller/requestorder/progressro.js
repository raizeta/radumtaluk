'use strict';
myAppModule.controller("ProgressController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.statusrevisimgr = false;
    $scope.statusrevisiacc = false;
    if($window.localStorage.getItem('revisimgr'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('revisimgr'));
        $scope.progress = [];
        var totalharga = 0;
        angular.forEach(prevro, function(value, index)
        {
            if(prevro[index].revisihargamgr != 0)
            {
                var harga  = parseInt(prevro[index].revisihargamgr);
            }
            else
            {
                if(prevro[index].revisiharga != 0)
                {
                    var harga  = parseInt(prevro[index].revisiharga);
                }
                else
                {
                    var harga  = parseInt(prevro[index].harga);
                }
            }

            if(prevro[index].revisijumlahmgr != 0)
            {
                var jumlah  = parseInt(prevro[index].revisijumlahmgr);
            }
            else
            {
                if(prevro[index].revisijumlah != 0)
                {
                    var jumlah  = parseInt(prevro[index].revisijumlah);
                }
                else
                {
                    var jumlah  = parseInt(prevro[index].jumlahorder);
                }
            }


            prevro[index].subtotal                  = harga * jumlah;
            $scope.progress.push(prevro[index]);

            var subtotal = harga * jumlah ;
            totalharga = totalharga + subtotal;
        });

        $scope.totalharga = totalharga;
        $scope.statusrevisimgr = true;
        $scope.statusrevisiacc  = true;

        console.log($scope.progress);
    }
    else
    {
        if($window.localStorage.getItem('revisiacc'))
        {
            var prevro = JSON.parse($window.localStorage.getItem('revisiacc'));
            $scope.progress = [];
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

                prevro[index].subtotal                  = harga * jumlah;
                $scope.progress.push(prevro[index]);

                var subtotal = harga * jumlah ;
                totalharga = totalharga + subtotal;
            });
            $scope.totalharga       = totalharga;
            $scope.statusrevisiacc  = true;
            console.log($scope.progress);
        }
        else
        {
            if($window.localStorage.getItem('set-harga'))
            {
                var prevro = JSON.parse($window.localStorage.getItem('set-harga'));
                $scope.progress = [];
                var totalharga = 0;
                angular.forEach(prevro, function(value, index)
                {
                    var harga  = parseInt(prevro[index].harga);
                    var jumlah  = parseInt(prevro[index].jumlahorder);

                    prevro[index].subtotal                  = harga * jumlah;
                    $scope.progress.push(prevro[index]);

                    var subtotal = harga * jumlah ;
                    totalharga = totalharga + subtotal;
                });
                $scope.totalharga = totalharga;
                console.log($scope.progress);
            }
        }  
    }
}]);

myAppModule.controller("ProgressDetailController", ["$rootScope","$scope", "$location","$http","auth","$window","$filter","$timeout","ProductService","TipeBarangService","UnitBarangService","CategoryService","sweet", 
function ($rootScope,$scope,$location,$http,auth,$window,$filter,$timeout,ProductService,TipeBarangService,UnitBarangService,CategoryService,sweet) 
{   
    $scope.userInfo = auth;
    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
    $scope.statusrevisimgr = false;
    $scope.statusrevisiacc = false;
    if($window.localStorage.getItem('revisimgr'))
    {
        var prevro = JSON.parse($window.localStorage.getItem('revisimgr'));
        $scope.progress = [];
        var totalharga = 0;
        angular.forEach(prevro, function(value, index)
        {
            if(prevro[index].revisihargamgr != 0)
            {
                var harga  = parseInt(prevro[index].revisihargamgr);
            }
            else
            {
                if(prevro[index].revisiharga != 0)
                {
                    var harga  = parseInt(prevro[index].revisiharga);
                }
                else
                {
                    var harga  = parseInt(prevro[index].harga);
                }
            }

            if(prevro[index].revisijumlahmgr != 0)
            {
                var jumlah  = parseInt(prevro[index].revisijumlahmgr);
            }
            else
            {
                if(prevro[index].revisijumlah != 0)
                {
                    var jumlah  = parseInt(prevro[index].revisijumlah);
                }
                else
                {
                    var jumlah  = parseInt(prevro[index].jumlahorder);
                }
            }


            prevro[index].subtotal                  = harga * jumlah;
            $scope.progress.push(prevro[index]);

            var subtotal = harga * jumlah ;
            totalharga = totalharga + subtotal;
        });

        $scope.totalharga = totalharga;
        $scope.statusrevisimgr = true;
        $scope.statusrevisiacc  = true;

        console.log($scope.progress);
    }
    else
    {
        if($window.localStorage.getItem('revisiacc'))
        {
            var prevro = JSON.parse($window.localStorage.getItem('revisiacc'));
            $scope.progress = [];
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

                prevro[index].subtotal                  = harga * jumlah;
                $scope.progress.push(prevro[index]);

                var subtotal = harga * jumlah ;
                totalharga = totalharga + subtotal;
            });
            $scope.totalharga       = totalharga;
            $scope.statusrevisiacc  = true;
            console.log($scope.progress);
        }
        else
        {
            if($window.localStorage.getItem('set-harga'))
            {
                var prevro = JSON.parse($window.localStorage.getItem('set-harga'));
                $scope.progress = [];
                var totalharga = 0;
                angular.forEach(prevro, function(value, index)
                {
                    var harga  = parseInt(prevro[index].harga);
                    var jumlah  = parseInt(prevro[index].jumlahorder);

                    prevro[index].subtotal                  = harga * jumlah;
                    $scope.progress.push(prevro[index]);

                    var subtotal = harga * jumlah ;
                    totalharga = totalharga + subtotal;
                });
                $scope.totalharga = totalharga;
                console.log($scope.progress);
            }
        }  
    }
}]);