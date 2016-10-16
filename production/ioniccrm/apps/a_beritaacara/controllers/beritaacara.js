angular.module('starter')
 .controller('BaCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading) 
{
	$scope.beritaacara = 
    [
        { id:1,nopo: "BA.LG.2016.01.0001", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000},
        { id:2,nopo: "BA.LG.2016.01.0002", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000},
        { id:3,nopo: "BA.LG.2016.01.0003", gambar:"assets/img/daenerys.jpg",createat:"2016-02-22",harga:12000}
    ];
})
.controller('BaInboxCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,BeritaAcaraFac,StorageService) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });

    BeritaAcaraFac.GetBeritaAcaras()
    .then(function (response)
    {
        $scope.beritaacaras = response;
    }).
    finally(function()
    {
        $ionicLoading.hide();
    });
    $scope.linkberitacarakomentar = function(item)
    {
        StorageService.set('baheader',item);
        $state.go('main.ba.inboxdetail',{id:item.KD_BERITA},{reload:false});
    }
})
.controller('BaInboxDetailCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,$ionicModal,$ionicScrollDelegate,StorageService,BeritaAcaraKomentarFac) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });

    $scope.baheader = StorageService.get('baheader');
    var baheaderkode = $scope.baheader.KD_BERITA;
    BeritaAcaraKomentarFac.SearchBeritaAcaraKomentars(baheaderkode)
    .then(function(response)
    {
        if(angular.isArray(response))
        {
            $scope.jumlahkoment = response.length;
            $scope.komentars    = response;
        }
    }).
    finally(function()
    {
        $ionicLoading.hide();
    });
    $scope.openModal = function() 
    {
        $ionicModal.fromTemplateUrl('apps/a_beritaacara/views/bamodal.html', 
        {
            scope: $scope
        })
        .then(function(modal) 
        {
            $scope.mdlkomentars     = $scope.komentars;
            console.log($scope.mdlkomentars);
            $scope.modal            = modal;
            $scope.modal.show();
        });
        
    };
    $scope.closeModal = function() 
    {
        $scope.modal.hide();
    };

    $scope.hideTime = true;

    var alternate,isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    $scope.sendMessage = function() 
    {
        alternate = !alternate;
        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
        var detail = {};
        detail.CHAT         = $scope.data.message;
        detail.CREATED_AT   = '2016-12-12 12:12:12';
        detail.CREATED_BY   = 'Radumta Sitepu';
        detail.ID_USER      = '9876543210';
        detail.KD_BERITA    = '1234567890';
        detail.STATUS       = 1;
        detail.UPDATED_AT   = '2016-12-12 12:12:12';
        $scope.mdlkomentars.push(detail);

        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);
    };

    $scope.inputUp = function() 
    {
        if (isIOS) $scope.data.keyboardHeight = 216;
        $timeout(function() 
        {
          $ionicScrollDelegate.scrollBottom(true);
        }, 300);
    };

    $scope.inputDown = function() 
    {
        if (isIOS) $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    };

    $scope.closeKeyboard = function() 
    {
    // cordova.plugins.Keyboard.close();
    };

    $scope.data = {};
    $scope.myId = '12345';
    $scope.messages = [];
})
.controller('BaOutboxCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('BaOutboxDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('BaHistoryCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
})
.controller('BaHistoryDetailCtrl', function($window,$timeout,$rootScope,$scope, $state,$ionicPopup,$ionicLoading) 
{
	$ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
});