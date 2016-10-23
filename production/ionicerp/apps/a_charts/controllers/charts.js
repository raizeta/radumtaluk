angular.module('starter')
 .controller('ChartsCtrl', function($window,$timeout,$rootScope,$scope,$state,$ionicPopup,$ionicLoading,$ionicModal,UtilService,MenuService) 
{
    var menus = [];
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"openModal()",judul:"Products"});
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"openModal()",judul:"Customers"});
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"openModal()",judul:"Supliers"});
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"openModal()",judul:"Purchases"});
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"openModalSales()",judul:"Sales"});
    menus.push({src: "assets/img/img/200x200/chart.jpg",link:"openModal()",judul:"SPG"});
    $scope.menus = UtilService.ArrayChunk(menus,4);
    $rootScope.sidemenu = MenuService.DashboardMenu();

    $scope.openModal = function(item) 
    {
        $ionicModal.fromTemplateUrl('apps/a_charts/views/charts-products.html', 
        {
            scope: $scope,
            animation: 'fade-in-scale'
        })
        .then(function(modal) 
        {
            $ionicLoading.show
            ({
                template: 'Loading...'
            });
            $scope.myDataSource =
            {
                "chart": {"caption":"Summary Customers Parents","subCaption":"Children Count Details","xAxisName":"Parents","yAxisName":"Total Child ","theme":"fint","is2D":"0","showValues":"1","palettecolors":"#583e78,#008ee4,#f8bd19,#e44a00,#6baa01,#ff2e2e","bgColor":"#ffffff","showBorder":"0","showCanvasBorder":"0"},
                "data": [{"label":"PT. Ramayana Lestari Sentosa Tbk.","value":"118"},{"label":"PT. Pertamina Retail","value":"104"},{"label":"PT. Lion Super Indo","value":"87"},{"label":"PT. Hero Supermarket Tbk.","value":"85"},{"label":"PT. Trans Retail Indonesia","value":"64"},{"label":"UNKNOWN","value":"29"},{"label":"PT. MOR","value":"24"},{"label":"PT. Aneka Citra Snack","value":"20"},{"label":"PT. LotteMart Indonesia","value":"15"},{"label":"Others","value":"14"},{"label":"PT. Swalayan Sukses Abadi (The FoodHall)","value":"14"},{"label":"Customer Demo","value":"13"},{"label":"All Fresh Fruit Store Indonesia","value":"10"},{"label":"PT. Koki Marketama","value":"5"},{"label":"PT. Mega Mahadana Hadiya","value":"5"},{"label":"PT. Rajawali Nusantara Indonesia (Persero)","value":"5"},{"label":"BENNY MART","value":"3"},{"label":"YOGYA Group (PT. Akur Pratama)","value":"3"},{"label":"PT. Food Hall Plaza Indo","value":"3"},{"label":"PT. AEON Indonesia","value":"2"}]
            };

            FusionCharts.ready(function() 
            {
              var conversionChart = new FusionCharts(
              {
                type: 'bar3d',
                renderAt: 'chart-salesdaily',
                width: "100%",
                dataFormat: 'json',
                dataSource: $scope.myDataSource
              });

              conversionChart.render();
            });

            $scope.Piramid =
            {
                "chart": {"caption":"Summary Category Parent","alignCaptionWithCanvas":"2","theme":"fint","bgColor":"#ffffff","showBorder":"0","showCanvasBorder":"1","is2D":"0","showValues":"1","showLegend":"1","showPercentValues":"1"},
                "data": [{"label":"MODERN","value":"224"},{"label":"General ","value":"7"},{"label":"Horeca","value":"0"},{"label":"Others","value":"0"}]  
            };
            FusionCharts.ready(function() 
            {
              var conversionChart = new FusionCharts(
              {
                type: 'pyramid',
                renderAt: 'chart-piramid',
                width: "100%",
                dataFormat: 'json',
                dataSource: $scope.Piramid
              });

              conversionChart.render();
            });

            $scope.custkategori = 
            {
                "chart": {"caption":"Summary Customers Category Detail","xAxisName":"Category Name","yAxisName":"Count ","theme":"fint","is2D":"0","showValues":"1","palettecolors":"#583e78,#008ee4,#f8bd19,#e44a00,#6baa01,#ff2e2e","bgColor":"#ffffff","showBorder":"0","showCanvasBorder":"0"},
                "data": [{"label":"MODERN MTI","value":"40"},{"label":"MODERN NKA","value":"182"},{"label":"MODERN SUPERMARKET MEDIUM","value":"3"},{"label":"General  Hospital: Public Gen","value":"2"},{"label":"General  Grosir","value":"3"},{"label":"General  FRUIT & VEGETABLE","value":"2"},{"label":"General  CAR REPAIR","value":"0"},{"label":"General  University","value":"0"},{"label":"General  SELF SERVICE CAFETAR","value":"0"},{"label":"General  CAKE & PETISSERIE","value":"0"},{"label":"Horeca Company Canteen/Rest","value":"0"},{"label":"Horeca Hotel","value":"0"},{"label":"Horeca COFFEE / Snack Place","value":"0"},{"label":"Horeca FITNESS / GYMNASIUM","value":"0"},{"label":"Horeca High School","value":"0"},{"label":"Horeca Theme Restaurant","value":"0"}]   
            }
            FusionCharts.ready(function() 
            {
              var conversionChart = new FusionCharts(
              {
                type: 'column3d',
                renderAt: 'chart-kategori',
                width: "100%",
                dataFormat: 'json',
                dataSource: $scope.custkategori
              });
              conversionChart.render();
            });

            $scope.modal            = modal;
            $scope.modal.show();
            $timeout(function()
            {
                $ionicLoading.hide();
            },3000);
        });  
    };
    $scope.openModalSales = function(item) 
    {
        $ionicModal.fromTemplateUrl('apps/a_charts/views/charts-sales.html', 
        {
            scope: $scope,
            animation: 'fade-in-scale'
        })
        .then(function(modal) 
        {
            $ionicLoading.show
            ({
                template: 'Loading...'
            });

            $scope.Piramid =
            {
                "chart": {"caption":"Summary Category Parent","alignCaptionWithCanvas":"2","theme":"fint","bgColor":"#ffffff","showBorder":"0","showCanvasBorder":"1","is2D":"0","showValues":"1","showLegend":"1","showPercentValues":"1"},
                "data": [{"label":"MODERN","value":"224"},{"label":"General ","value":"7"},{"label":"Horeca","value":"0"},{"label":"Others","value":"0"}]  
            };
            FusionCharts.ready(function() 
            {
              var conversionChart = new FusionCharts(
              {
                type: 'pyramid',
                renderAt: 'chart-piramid',
                width: "100%",
                dataFormat: 'json',
                dataSource: $scope.Piramid
              });

              conversionChart.render();
            });

            $scope.modal            = modal;
            $scope.modal.show();
            $timeout(function()
            {
                $ionicLoading.hide();
            },3000);
        });  
    };
    $scope.closeModal = function() 
    {
        $scope.modal.remove();
    };
    $scope.$on('$destroy', function() 
    {
        $scope.modal.remove();
    });
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

