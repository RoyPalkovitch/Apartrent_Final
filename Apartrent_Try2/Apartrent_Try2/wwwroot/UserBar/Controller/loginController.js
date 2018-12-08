var loginController = angular.module('loginController', []);

loginController.controller('loginController', function ($scope,$rootScope, $http, $location,userProfile) {


    $scope.login = function () { //login vadilation through get request
        $http.get('api/users/login?userName=' + $scope.loginUserName + '&password=' + $scope.loginPassword).then(function (response) {
            if (response.data) {
                response.data.password = $scope.loginPassword;// all the userProfile will be in token for now i need to save the password like this
                if (response.data.role === 1 && response.data.pendingOrders !== null)
                    response.data.pendingNotification = response.data.pendingOrders.length;
                userProfile.setToken(response.data.token);
                response.data.token = null;
                userProfile.setData(response.data); //save data in factory
                $scope.errorLoginDisplay = false;
                $rootScope.role = response.data.role;
                $scope.loginUserName = "";
                $scope.loginPassword = "";
                return $location.url('/index');
            }
            $scope.errorLoginDisplay = true;
            return false;
        });

    };
});

