angular.module('starter')
 .controller('ChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,UtilService,MenuService) 
{
    var menus = [];
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"#/main/products",judul:"Products"});
    menus.push({src: "assets/img/img/200x200/money.png",link:"#/main/customers",judul:"Customers"});
    menus.push({src: "assets/img/img/200x200/meeting.png",link:"#/main/supliers",judul:"Supliers"});
    menus.push({src: "assets/img/img/200x200/hrm.png",link:"#/main/purchases",judul:"Purchases"});
    menus.push({src: "assets/img/img/200x200/hrm.png",link:"#/main/sales",judul:"Sales"});
    menus.push({src: "assets/img/img/200x200/hrm.png",link:"#/main/spg",judul:"SPG"});
    $scope.menus = UtilService.ArrayChunk(menus,4);
    $rootScope.sidemenu = MenuService.ChartsMenu();
})

.controller('ChartProductsCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,MenuService) 
{
	$rootScope.sidemenu = MenuService.ChartsMenu();
    $ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
	{
		$ionicLoading.hide();
	},3000);
	$scope.myDataSource =
    {
        "chart": {
            "caption": "Week Sales ",
            "numberprefix": "",
            "plotgradientcolor": "",
            "bgcolor": "FFFFFF",
            "showalternatehgridcolor": "0",
            "divlinecolor": "CCCCCC",
            "showvalues": "0",
            "showcanvasborder": "0",
            "canvasborderalpha": "0",
            "canvasbordercolor": "CCCCCC",
            "canvasborderthickness": "1",
            "yaxismaxvalue": "200",
            "captionpadding": "30",
            "linethickness": "3",
            "yaxisvaluespadding": "15",
            "legendshadow": "0",
            "legendborderalpha": "0",
            "palettecolors": "#6baa01,#33bdda,#e44a00,#6baa01,#583e78",
            "showborder": "1"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Senin"
                    },
                    {
                        "label": "Selasa"
                    },
                    {
                        "label": "Rabu"
                    },
                    {
                        "label": "Kamis"
                    },
                    {
                        "label": "Jumat"
                    },
                    {
                        "label": "Sabtu"
                    },
                    {
                        "label": "Minggu"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Minggu Ke-1",
                "data": [
                    {
                        "value": "10000"
                    },
                    {
                        "value": "11500"
                    },
                    {
                        "value": "12500"
                    },
                    {
                        "value": "15000"
                    },
                    {
                        "value": "15000"
                    },
                    {
                        "value": "15000"
                    },
                    {
                        "value": "15000"
                    }
                ]
            },
            {
                "seriesname": "Minggu Ke-2",
                "data": [
                    {
                        "value": "25400"
                    },
                    {
                        "value": "29800"
                    },
                    {
                        "value": "21800"
                    },
                    {
                        "value": "20800"
                    },
                    {
                        "value": "26800"
                    },
                    {
                        "value": "26800"
                    },
                    {
                        "value": "26800"
                    }
                ]
            },
            {
                "seriesname": "Minggu Ke-3",
                "data": [
                    {
                        "value": "35400"
                    },
                    {
                        "value": "39800"
                    },
                    {
                        "value": "31800"
                    },
                    {
                        "value": "30800"
                    },
                    {
                        "value": "36800"
                    },
                    {
                        "value": "36800"
                    },
                    {
                        "value": "36800"
                    }
                ]
            },
            {
                "seriesname": "Minggu Ke-4",
                "data": [
                    {
                        "value": "45400"
                    },
                    {
                        "value": "49800"
                    },
                    {
                        "value": "41800"
                    },
                    {
                        "value": "46800"
                    },
                    {
                        "value": "46800"
                    },
                    {
                        "value": "46800"
                    },
                    {
                        "value": "46800"
                    }
                ]
            }
        ]
    };
    FusionCharts.ready(function() 
    {
      var conversionChart = new FusionCharts(
      {
        type: 'msline',
        renderAt: 'chart-salesdaily',
        width: "100%",
        dataFormat: 'json',
        dataSource: $scope.myDataSource
      });

      conversionChart.render();
    });
    FusionCharts.ready(function() 
    {
      var conversionChart = new FusionCharts(
      {
        type: 'msline',
        renderAt: 'chart-salesweekly',
        width: "100%",
        dataFormat: 'json',
        dataSource: $scope.myDataSource
      });

      conversionChart.render();
    });
    FusionCharts.ready(function() 
    {
      var conversionChart = new FusionCharts(
      {
        type: 'msline',
        renderAt: 'chart-salesmonthly',
        width: "100%",
        dataFormat: 'json',
        dataSource: $scope.myDataSource
      });

      conversionChart.render();
    });
})

.controller('ChartCustomersCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,MenuService) 
{
    $rootScope.sidemenu = MenuService.ChartsMenu();
    $ionicLoading.show
    ({
        template: 'Loading...'
    });
    $timeout(function()
    {
        $ionicLoading.hide();
    },3000);
    $scope.myDataSource =
    {
        "chart": {
            "caption": "Week Sales ",
            "numberprefix": "",
            "plotgradientcolor": "",
            "bgcolor": "FFFFFF",
            "showalternatehgridcolor": "0",
            "divlinecolor": "CCCCCC",
            "showvalues": "0",
            "showcanvasborder": "0",
            "canvasborderalpha": "0",
            "canvasbordercolor": "CCCCCC",
            "canvasborderthickness": "1",
            "yaxismaxvalue": "200",
            "captionpadding": "30",
            "linethickness": "3",
            "yaxisvaluespadding": "15",
            "legendshadow": "0",
            "legendborderalpha": "0",
            "palettecolors": "#6baa01,#33bdda,#e44a00,#6baa01,#583e78",
            "showborder": "1"
        },
        "categories": [
            {
                "category": [
                    {
                        "label": "Senin"
                    },
                    {
                        "label": "Selasa"
                    },
                    {
                        "label": "Rabu"
                    },
                    {
                        "label": "Kamis"
                    },
                    {
                        "label": "Jumat"
                    },
                    {
                        "label": "Sabtu"
                    },
                    {
                        "label": "Minggu"
                    }
                ]
            }
        ],
        "dataset": [
            {
                "seriesname": "Minggu Ke-1",
                "data": [
                    {
                        "value": "10000"
                    },
                    {
                        "value": "11500"
                    },
                    {
                        "value": "12500"
                    },
                    {
                        "value": "15000"
                    },
                    {
                        "value": "15000"
                    },
                    {
                        "value": "15000"
                    },
                    {
                        "value": "15000"
                    }
                ]
            },
            {
                "seriesname": "Minggu Ke-2",
                "data": [
                    {
                        "value": "25400"
                    },
                    {
                        "value": "29800"
                    },
                    {
                        "value": "21800"
                    },
                    {
                        "value": "20800"
                    },
                    {
                        "value": "26800"
                    },
                    {
                        "value": "26800"
                    },
                    {
                        "value": "26800"
                    }
                ]
            },
            {
                "seriesname": "Minggu Ke-3",
                "data": [
                    {
                        "value": "35400"
                    },
                    {
                        "value": "39800"
                    },
                    {
                        "value": "31800"
                    },
                    {
                        "value": "30800"
                    },
                    {
                        "value": "36800"
                    },
                    {
                        "value": "36800"
                    },
                    {
                        "value": "36800"
                    }
                ]
            },
            {
                "seriesname": "Minggu Ke-4",
                "data": [
                    {
                        "value": "45400"
                    },
                    {
                        "value": "49800"
                    },
                    {
                        "value": "41800"
                    },
                    {
                        "value": "46800"
                    },
                    {
                        "value": "46800"
                    },
                    {
                        "value": "46800"
                    },
                    {
                        "value": "46800"
                    }
                ]
            }
        ]
    };
    FusionCharts.ready(function() 
    {
      var conversionChart = new FusionCharts(
      {
        type: 'msline',
        renderAt: 'chart-salesdaily',
        width: "100%",
        dataFormat: 'json',
        dataSource: $scope.myDataSource
      });

      conversionChart.render();
    });
    FusionCharts.ready(function() 
    {
      var conversionChart = new FusionCharts(
      {
        type: 'msline',
        renderAt: 'chart-salesweekly',
        width: "100%",
        dataFormat: 'json',
        dataSource: $scope.myDataSource
      });

      conversionChart.render();
    });
    FusionCharts.ready(function() 
    {
      var conversionChart = new FusionCharts(
      {
        type: 'msline',
        renderAt: 'chart-salesmonthly',
        width: "100%",
        dataFormat: 'json',
        dataSource: $scope.myDataSource
      });

      conversionChart.render();
    });
});

