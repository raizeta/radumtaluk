salesman.controller("HomeController", ["$scope", "$http", function($scope, $http) 
{
		//http://api.lukisongroup.com/master/barangumums/1?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa
        //http://api.lukisongroup.com/master/barangumums/1?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa&expand=kategori,type,unit,suplier

        $http.get('http://api.lukisongroup.com/master/barangumums?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
        .success(function(data,status, headers, config) 
        {
            $scope.barangumums = data.BarangUmum ;
        })

        .error(function (data, status, header, config) 
        {
                
        });

        $http.get('http://api.lukisongroup.com/master/kategoris?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
        .success(function(data,status, headers, config) 
        {
            $scope.categories = data.Kategori ;
        })

        .error(function (data, status, header, config) 
        {
                
        });

        $http.get('http://api.lukisongroup.com/master/tipebarangs?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
        .success(function(data,status, headers, config) 
        {
            $scope.typebarangs = data.Tipebarang ;
        })

        .error(function (data, status, header, config) 
        {
                
        });

        $http.get('http://api.lukisongroup.com/master/supliers?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
        .success(function(data,status, headers, config) 
        {
            $scope.supliers = data.Suplier ;
        })

        .error(function (data, status, header, config) 
        {
                
        });

}]);

salesman.controller("SingleController", function($scope,$http,$routeParams) 
{
    $scope.id   = $routeParams.id;
    $http.get('http://api.lukisongroup.com/master/barangumums/'+ $scope.id + '?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa')
    .success(function(data,status, headers, config) 
    {
        $scope.barangumum = data;
    })

    .error(function (data, status, header, config) 
    {
       
    });

});

salesman.controller("TipsController", function($scope,$http) 
{

});

salesman.controller("SettingController", function($scope,$http) 
{

});


salesman.controller("TipsController", function($scope,$http) 
{

});

salesman.controller("FaqController", function($scope,$http) 
{
	$http.get('http://localhost/sym/ecommerce/web/app_dev.php/api/listbank')
        .success(function(data,status, headers, config) 
        {
            $scope.banks = data.banklist ;
        })

        .error(function (data, status, header, config) 
        {
                
        });
});

