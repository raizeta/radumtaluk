angular.module('starter')
.controller('LoginCtrl', function($scope, $state, $ionicPopup,$ionicLoading,SecuredFac) 
{
    $scope.login = function (user) 
    {
        $ionicLoading.show
        ({
            template: 'Loading...'
        });

        $scope.disableInput = true;
        $scope.users    = angular.copy(user);
        var username    = $scope.users.username;
        var password    = $scope.users.password;
        
        SecuredFac.Login(username, password)
        .then(function (result) 
        {
            $state.go('main.dashboard', {}, {reload: true});
            $ionicLoading.hide();
        }, 
        function (err) 
        {          
            if(err == 'password_salah')
            {
                $scope.users = {password:null};
                focus('focusPassword');
                var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Password Salah!'
                });
                 
            }
            else if(err == 'username_salah')
            {
                var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Username Salah!'
                });
                $scope.users.username    = "";
                $scope.users.password    = "";
                focus('focusUsername');
            }
            else
            {
                var alertPopup = $ionicPopup.alert({
                  title: 'Login failed!',
                  template: 'Jaringan Bermasalah!'
                });
                focus('focusUsername');
            }
            $ionicLoading.hide();
        });
    }
});