'use strict';
myAppModule.controller("SalesmanEditController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", function ($scope, $location, $http, $routeParams, authService, auth) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    $scope.idbarangumum = $routeParams.idbarangumum;
    $http.get('http://api.lukisongroup.com/master/barangumums/'+ $scope.idbarangumum + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.ebuid = data.ID ;
        $scope.ebukdbarang = data.KD_BARANG ;
        $scope.ebunmbarang = data.NM_BARANG ;
        $scope.ebutypebarang = data.KD_TYPE ;
        $scope.ebukdunit = data.KD_UNIT ;
        $scope.ebukdsuplier = data.KD_SUPPLIER ;
        $scope.ebukddistributor = data.KD_DISTRIBUTOR ;
        $scope.ebuparent = data.PARENT ;
        $scope.ebuhpp = data.HPP ;
        $scope.ebuharga = data.HARGA ;
        $scope.ebubarcode = data.BARCODE ;
        $scope.ebuimage = data.IMAGE;
        $scope.ebuimage = data.NOTE  ;
        $scope.ebukdcorp = data.KD_CORP ;
        $scope.ebukdcab = data.KD_CAB ;
        $scope.ebukddep = data.KD_DEP ;
        $scope.ebustatus = data.STATUS ;
        $scope.loading = false ;

    })

    .error(function (data, status, header, config) 
    {
            
    });

    $scope.idkategori = $routeParams.idkategori;
    $http.get('http://api.lukisongroup.com/master/kategoris/'+ $scope.idkategori + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.ekid = data.ID ;
        $scope.ekkdkategori = data.KD_KATEGORI;
        $scope.eknamakategori = data.NM_KATEGORI;
        $scope.eknote = data.NOTE;
        $scope.ekstatus = data.STATUS;
        $scope.ekcorpid = data.CORP_ID;
        $scope.loading = false ;

    })

    .error(function (data, status, header, config) 
    {
            
    });

    $scope.idtipebarang = $routeParams.idtipebarang;
    $http.get('http://api.lukisongroup.com/master/tipebarangs/'+ $scope.idtipebarang + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.etbid = data.ID ;
        $scope.etbkdtype = data.KD_TYPE ;
        $scope.etbnamatype = data.NM_TYPE ;
        $scope.etbnote = data.NOTE ;
        $scope.etbstatus = data.STATUS ;
        $scope.etbcorpid = data.CORP_ID ;
        $scope.loading = false ;
    })

    .error(function (data, status, header, config) 
    {
            
    });


    $scope.idsuplier = $routeParams.idsuplier;
    $http.get('http://api.lukisongroup.com/master/supliers/'+ $scope.idsuplier + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.esupid = data.ID;
        $scope.esupkdsup = data.KD_SUPPLIER;
        $scope.esupnamasup = data.NM_SUPPLIER;
        $scope.esupalamat = data.ALAMAT;
        $scope.esupkota = data.KOTA;
        $scope.esuptlp = data.TLP;
        $scope.esupmobile = data.MOBILE;
        $scope.esupfax = data.FAX;
        $scope.esupemail = data.EMAIL;
        $scope.esupwebsite = data.WEBSITE;
        $scope.esupimage = data.IMAGE;
        $scope.esupnote = data.NOTE;
        $scope.esupkdcorp = data.KD_CORP;
        $scope.esupkdcab = data.KD_CAB;
        $scope.esupkddep = data.KD_DEP;
        $scope.esupstatus = data.STATUS;
        $scope.loading = false ;

    })

    .error(function (data, status, header, config) 
    {
            
    });
    
}]);

