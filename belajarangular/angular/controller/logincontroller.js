
myApp.controller("LoginController",function ($scope) 
{
        alert("radumta sitepu");
        $scope.username="radumta sitepu";
        $scope.loginu = function()
        {
            alert("Novanto");
        }
        $scope.login = function(user)
        {
            alert("Novanto SUbmit");
        }
    $scope.clicko = function() {
        $scope.boolChangeClass = !$scope.boolChangeClass;

    }	   
} );
