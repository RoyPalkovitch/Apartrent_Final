var loginController = angular.module('loginController', []);

loginController.controller('loginController', function ($scope, $rootScope, $window, $location, $http, userProfile, imageHandlerFactory) {

    if ($window.sessionStorage.getItem("userToken"))
        $location.url("index");
    $scope.login = function () { //login vadilation through get request
        if ( $scope.loginUserName === undefined || $scope.loginUserName.length > 10 || $scope.loginPassword.length > 10) {
            $scope.errorMessage = true;
            return;
        }
        $http.get('api/users/login?userName=' + $scope.loginUserName + '&password=' + $scope.loginPassword).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                if (response.data.role === 1 && response.data.pendingOrders !== null) {
                    response.data.pendingNotification = response.data.pendingOrders.length;

                    for (var i = 0; i < response.data.renterApartments.length; i++) {
                        response.data.renterApartments[i].apartmentImage = imageHandlerFactory.constructImage(response.data.renterApartments[i].apartmentImageType, response.data.renterApartments[i].apartmentImage);
                    }
                }
                $scope.loginUserName = "";
                $scope.loginPassword = "";
                userProfile.setToken(response.data.token);
                response.data.token = null;
                response.data.profileImage = imageHandlerFactory.constructImage(response.data.profileImageType, response.data.profileImage);
                
                userProfile.setData(response.data); //save data in factory
                $scope.errorLoginDisplay = false;
                $rootScope.role = response.data.role;
                $rootScope.reload = false;

                return window.history.back();
            }
            $rootScope.reload = false;
            $scope.errorMessage = true;

            return false;
        });

    };
});

