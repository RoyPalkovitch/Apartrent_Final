var loginController = angular.module('loginController', []);

loginController.controller('loginController', function ($scope,$rootScope, $http,userProfile) {


    $scope.login = function () { //login vadilation through get request
        if ( $scope.loginUserName === undefined || $scope.loginUserName.length > 11 || $scope.loginPassword === undefined || $scope.loginPassword.length > 8) {
            $scope.errorLoginDisplay = true;
            return;
        }
        $http.get('api/users/login?userName=' + $scope.loginUserName + '&password=' + $scope.loginPassword).then(function (response) {
            if (response.data) {
                if (response.data.role === 1 && response.data.pendingOrders !== null)
                    response.data.pendingNotification = response.data.pendingOrders.length;
                $scope.loginUserName = "";
                $scope.loginPassword = "";
                userProfile.setToken(response.data.token);
                response.data.token = null;
                userProfile.setData(response.data); //save data in factory
                $scope.errorLoginDisplay = false;
                $rootScope.role = response.data.role;
                return window.history.back();
            }
            return false;
        });

    };
});

