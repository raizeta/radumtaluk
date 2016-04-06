myAppModule.controller("NewSuplierController", ["$scope", "$location","$http", "authService", "auth","$window", function ($scope, $location, $http, authService, auth,$window) 
{

    $scope.userInfo = auth;

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }    
}]);
myAppModule.controller("ListSuplierController", ["$scope", "$location","$http", "authService", "auth","$window","apiService", 
function ($scope, $location, $http, authService, auth,$window,apiService) 
{
    $scope.loading  = true;
    $scope.userInfo = auth;
    $scope.loadData = function()
    {
        apiService.listsuplier()
        .then(function (result) 
        {
            $scope.supliers = result.Suplier;
            $scope.loading = false;  
        }, 
        function (error) 
        {          
            $scope.loadData();   
        });
    }
    
    $scope.loadData();
    

    $scope.logout = function () 
    { 
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }

   $scope.menuOptions = 
    [
        ['View Detail', function ($itemScope) 
        {
            $scope.selected = $itemScope.suplier.ID;
            $location.path('/erp/masterbarang/detail/suplier/'+$scope.selected );
        }],
        null, // Dividier
        ['Edit', function ($itemScope) 
        {
            $scope.selected = $itemScope.suplier.ID;
            $location.path('/erp/masterbarang/edit/suplier/'+$scope.selected );
        }],
        null, // Dividier
        ['Delete', function ($itemScope) 
        {
            $scope.selected = $itemScope.suplier.ID;

            if(confirm("Apakah Anda Yakin Menghapus Unit Barang:" + $scope.selected))
            {
                $location.path('/erp/masterbarang/delete/suplier/'+ $scope.selected)
            } 

        }]
    ]; 

}]);
myAppModule.controller("DetailSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", 
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idsuplier = $routeParams.idsuplier;
    singleapiService.singlelistsuplier(idsuplier)
    .then(function(data)
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

        $scope.loading = false;
    },
    function(error)
    {

    });

    $scope.logout = function () 
    {
        
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";

    }
}]);
myAppModule.controller("EditSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window","singleapiService", "ngToast",
function ($scope, $location, $http, $routeParams, authService, auth, $window,singleapiService,ngToast) 
{
    $scope.loading = true ;
    $scope.userInfo = auth;
    var idsuplier = $routeParams.idsuplier;
    singleapiService.singlelistsuplier(idsuplier)
    .then(function(data)
    {
        $scope.data = data;
        $scope.loading = false;
    });

    $scope.submitForm = function(data)
    {
 
            $scope.loading = true;

            function serializeObj(obj) 
            {
              var result = [];
              for (var property in obj) result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));
              return result.join("&");
            }
            
            var serialized = serializeObj(data); 

            var config = 
            {
                headers : 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;application/json;charset=utf-8;'
                    
                }
            };
            
            $http.put("http://labtest3-api.int/master/supliers/"+ idsuplier +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",serialized,config)
            .success(function(data,status, headers, config) 
            {
                ngToast.create('Suplier Telah Berhasil Di Update');
                $location.path("/erp/masterbarang/list/suplier");

            })

            .finally(function()
            {
                $scope.loading = false;  
            });

    }
    $scope.logout = function () 
    {  
        $scope.userInfo = null;
        $window.sessionStorage.clear();
        window.location.href = "index.html";
    }
}]);

myAppModule.controller("DeleteSuplierController", ["$scope", "$location","$http", "$routeParams", "authService", "auth", "$window", function ($scope, $location, $http, $routeParams, authService, auth, $window) 
{
    var idsuplier = $routeParams.idsuplier;
    var config = 
    {
        headers : 
        {
            'Content-Type': 'application/x-www-form-urlencoded', 
        }
    };
    
    $http.delete("http://labtest3-api.int/master/supliers/"+ idsuplier +"?access-token=azLSTAYr7Y7TLsEAML-LsVq9cAXLyAWa",config)
    .success(function(data,status, headers, config) 
    {
        $location.path('/erp/masterbarang/list/suplier');

    })

    .error(function (data, status, header, config) 
    {
        alert("Tidak Berhasil");    
    })

    .finally(function()
    {
        $scope.loading = false;  
    });

}]);