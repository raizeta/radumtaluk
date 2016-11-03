angular.module('starter')
.controller('CustLayerGeoChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService,ChartsCustomerFac) 
{
    
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        ChartsCustomerFac.GetCustomerCharts()
        .then(function(response)
        {
            FusionCharts.ready(function () 
            {
                

                var ChartLayer = new FusionCharts({
                    type: 'column3d',
                    renderAt: 'chart-layer',
                    width: '100%',
                    dataFormat: 'json',
                    dataSource: response.Total_Layer
                });
                ChartLayer.render();

                var ChartGeo = new FusionCharts({
                    type: 'column3d',
                    renderAt: 'chart-geolocation',
                    width: '100%',
                    dataFormat: 'json',
                    dataSource: response.Total_Geo
                });
                ChartGeo.render();

                var CombLayerGeo = new FusionCharts({
                    type: 'mscolumn3d',
                    renderAt: 'chart-comblayergeo',
                    width: '100%',
                    dataFormat: 'json',
                    dataSource: response.CombLayerGeo
                });
                CombLayerGeo.render();    
            });
        });


        $timeout(function()
        {
            $ionicLoading.hide();
        },500);
    });
})
.controller('CustNewChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService,ChartsCustomerFac) 
{
    $scope.example = {value: new Date()};
    $scope.onSearchChange = function()
    {
        var tahunbulan = $filter('date')($scope.example.value,'yyyy-MM');
        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
            ChartsCustomerFac.GetNewCustomerCharts(tahunbulan)
            .then(function(response)
            {
                FusionCharts.ready(function () 
                {
                    var ChartLayer = new FusionCharts({
                        type: 'mscolumn3d',
                        renderAt: 'chart-layer',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.NewCustCombGeoLayer
                    });
                    ChartLayer.render(); 
                });
            });

            $timeout(function()
            {
                $ionicLoading.hide();
            },500);
        });
    }
    $scope.onSearchChange();
    
})
.controller('CustKunjunganChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService,ChartsCustomerFac) 
{
    
    $scope.example = {value: new Date()};
    $scope.onSearchChange = function()
    {
        var tahunbulan = $filter('date')($scope.example.value,'yyyy-MM');

        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {
            ChartsCustomerFac.GetCustomerKunjunganCharts(tahunbulan)
            .then(function(response)
            {
                FusionCharts.ready(function () 
                {
                    var ChartKunjunganGeo = new FusionCharts({
                        type: 'column3d',
                        renderAt: 'chart-kunjungangeo',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.Kunjungan_Geo_Per_Bulan
                    });
                    ChartKunjunganGeo.render(); 
                });
            });
            $timeout(function()
            {
                $ionicLoading.hide();
            },500);
        });
    }
    $scope.onSearchChange();
})
.controller('CustStockLayerGeoChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService,ChartsCustomerFac) 
{
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {
        ChartsCustomerFac.GetCustomerStockCharts()
        .then(function(response)
        {
            FusionCharts.ready(function () 
            {
                var geoChart = new FusionCharts({
                type: 'mscolumn3d',
                renderAt: 'chart-stockgeo',
                width: '100%',
                dataFormat: 'json',
                dataSource: response.StockPerGeo
                });
                geoChart.render();

                var layerChart = new FusionCharts(
                {
                    type: 'mscolumn3d',
                    renderAt: 'chart-stocklayer',
                    width: '100%',
                    dataFormat: 'json',
                    dataSource: response.StockPerLayer
                });
                layerChart.render();

                var StockPerProducts = new FusionCharts(
                {
                    type: 'column3d',
                    renderAt: 'chart-stockperproducts',
                    width: '100%',
                    dataFormat: 'json',
                    dataSource: response.StockTotalPerProducts
                });
                StockPerProducts.render();
            });
            $ionicLoading.hide();
        });
    });
})

.controller('CustExpiredLayerGeoChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService,ChartsCustomerFac) 
{
    $scope.example = {value: new Date()};
    $scope.onSearchChange = function()
    {
        var tahunbulan = $filter('date')($scope.example.value,'yyyy-MM');

        $ionicLoading.show
        ({
          template: 'Loading...'
        })
        .then(function()
        {

            ChartsCustomerFac.GetCustomerExpiredCharts(tahunbulan)
            .then(function(response)
            {
                FusionCharts.ready(function () 
                {
                    var ExpiredGeo = new FusionCharts(
                    {
                        type: 'mscolumn3d',
                        renderAt: 'chart-expiredgeomonth',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.ExpiredPerGeo
                    });
                    ExpiredGeo.render();

                    var ExpiredLayer = new FusionCharts(
                    {
                        type: 'mscolumn3d',
                        renderAt: 'chart-expiredlayermonth',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.ExpiredPerLayer
                    });
                    ExpiredLayer.render();

                    var TotalExpired = new FusionCharts({
                        type: 'column3d',
                        renderAt: 'chart-totalexpired',
                        width: '100%',
                        dataFormat: 'json',
                        dataSource: response.TotalExpired
                    });
                    TotalExpired.render();
                }); 
            })
            
            $timeout(function()
            {
                $ionicLoading.hide();
            },500);
        });
    }
    $scope.onSearchChange();
})

.controller('CustExpiredCombChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$filter,$ionicPopup,$ionicLoading,MenuService,ChartsSalesFac,StorageService) 
{
    $ionicLoading.show
    ({
      template: 'Loading...'
    })
    .then(function()
    {

        FusionCharts.ready(function () 
        {
            var analysisChart = new FusionCharts({
                type: 'stackedColumn3DLine',
                renderAt: 'chart-container',
                width: '100%',
                height:'600',
                dataFormat: 'json',
                dataSource: {
                    "chart": {
                        "caption": "Total Expired",
                        "paletteColors": "#b2d9f9,#f7c018,#94bf13,#ff9049,#069191,#d74a4a,#914b91,#5c882b,#0c93d8",
                        "bgColor": "#ffffff",                
                        "showBorder": "0",
                        "showCanvasBorder": "0",
                        "usePlotGradientColor": "0",
                        "plotBorderAlpha": "10",
                        "legendBorderAlpha": "0",
                        "legendBgAlpha": "0",
                        "legendShadow": "0",
                        "showHoverEffect":"1",
                        "valueFontColor": "#ffffff",
                        "rotateValues": "0",
                        "placeValuesInside": "1",
                        "divlineColor": "#999999",
                        "divLineIsDashed": "1",
                        "divLineDashLen": "1",
                        "divLineGapLen": "1",
                        "canvasBgColor": "#ffffff",
                        "captionFontSize": "14",
                        "subcaptionFontSize": "14",
                        "subcaptionFontBold": "0"
                    },
                    "categories": [
                        {
                            "category": [
                                {
                                    "label": "Maxi Talos"
                                },
                                {
                                    "label": "Maxi Cracker"
                                },
                                {
                                    "label": "Maxi Mixed"
                                },
                                {
                                    "label": "Maxi Crispy"
                                }
                            ]
                        }
                    ],
                    "dataset": [
                        {
                            "seriesname": "November",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "22"
                                },
                                {
                                    "value": "22"
                                },
                                {
                                    "value": "23"
                                }
                            ]
                        },
                        {
                            "seriesname": "Desember",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },
                        {
                            "seriesname": "January",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },
                        {
                            "seriesname": "Pebruari",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "Maret",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "April",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "Mei",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "Juni",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "July",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "August",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "Sept",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        },{
                            "seriesname": "Ockt",
                            "data": [
                                {
                                    "value": "23"
                                },
                                {
                                    "value": "14"
                                },
                                {
                                    "value": "19"
                                },
                                {
                                    "value": "32"
                                }
                            ]
                        }
                    ]
                }
            }).render();
        });

        $timeout(function()
        {
            $ionicLoading.hide();
        },500);
    }); 
});