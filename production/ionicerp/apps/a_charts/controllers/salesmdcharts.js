angular.module('starter')
.controller('VisitChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService) 
{
    $scope.example = {value: null};
    $scope.onSearchChange = function()
    {
        console.log($scope.example);
        var bulan = $filter('date')($scope.example.value,'MM');

        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
           ChartsSalesFac.GetVisitStock(bulan)
            .then(function(response)
            {
                StorageService.set('chart-sale',response);
                FusionCharts.ready(function() 
                {
                  var conversionChart = new FusionCharts(
                  {
                    type: 'msline',
                    renderAt: 'chart-visit',
                    width: "100%",
                    dataFormat: 'json',
                    dataSource: response.Visit
                  });
                  conversionChart.render();
                });
            })
            .finally(function()
            {
                $ionicLoading.hide();  
            });
        });
    }
    $scope.onSearchChange();
})
.controller('ActionVisitChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService) 
{

    var result = StorageService.get('chart-sale');
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        FusionCharts.ready(function() 
        {
            
            var conversionChart = new FusionCharts(
            {
                type: 'mscolumn3d',
                renderAt: 'chart-actionvisit',
                width: "100%",
                dataFormat: 'json',
                dataSource: result.ActionVisit
            });
            conversionChart.render();
            $ionicLoading.hide(); 
        });  
    });
})
.controller('ActionVisitRequestChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService) 
{

    $ionicLoading.show
    ({
        template: 'Loading...'
    })
    .then(function()
    {
        var result = StorageService.get('chart-sale');
        FusionCharts.ready(function() 
        {
          var conversionChart = new FusionCharts(
          {
            type: 'mscolumn3d',
            renderAt: 'chart-actionvisitrequest',
            width: "100%",
            dataFormat: 'json',
            dataSource: result.ActionVisitRequest
          });
          conversionChart.render();
          $ionicLoading.hide();
        });   
    });
})
.controller('ActionVisitSellOutChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService) 
{
    $ionicLoading.show
    ({
        template: 'Loading...'
    })
    .then(function()
    {
        var result = StorageService.get('chart-sale');
        FusionCharts.ready(function() 
        {
          var conversionChart = new FusionCharts(
          {
            type: 'mscolumn3d',
            renderAt: 'chart-actionvisitsellout',
            width: "100%",
            dataFormat: 'json',
            dataSource: result.ActionVisitSellout
          });
          conversionChart.render();
          $ionicLoading.hide();
        });   
    });
});

