var loginController = angular.module('loginController', []);

loginController.controller('loginController', function ($scope, $rootScope, $window, $location, $http, userProfile, imageHandlerFactory, dateHandlerFactory) {
    $scope.loginBtn = false;

    if ($window.sessionStorage.getItem("userToken"))
        $location.url("index");
    $scope.login = function () { //login vadilation through get request
        if ($scope.loginUserName === undefined || $scope.loginUserName.length > 10 || $scope.loginUserName.length < 4 || $scope.loginPassword.length > 10 || $scope.loginPassword.length < 6) {
            $scope.errorMessage = true;
            return;
        }
        $scope.loginBtn = true;
        $http.get('api/users/login?userName=' + $scope.loginUserName + '&password=' + $scope.loginPassword).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                $scope.loginBtn = false;
                if (response.data.pendingOrders !== null) {
                    response.data.pendingNotification = response.data.pendingOrders.length;
                }
                if (response.data.role === 1) {
                    for (var i = 0; i < response.data.renterApartments.length; i++) {
                        response.data.renterApartments[i].apartmentImage = imageHandlerFactory.constructImage(response.data.renterApartments[i].apartmentImageType, response.data.renterApartments[i].apartmentImage);
                        response.data.renterApartments[i].fromDate = dateHandlerFactory.dateConverter(response.data.renterApartments[i].fromDate);
                        response.data.renterApartments[i].toDate = dateHandlerFactory.dateConverter(response.data.renterApartments[i].toDate);

                    }
                }
                $scope.loginUserName = "";
                $scope.loginPassword = "";
                userProfile.setToken(response.data.token);
                response.data.token = null;
                if (response.data.profileImage)
                    response.data.profileImage = imageHandlerFactory.constructImage(response.data.profileImageType, response.data.profileImage);
                
                userProfile.setData(response.data); //save data in factory
                $scope.errorLoginDisplay = false;
                $rootScope.role = response.data.role;
                $rootScope.reload = false;

                return window.history.back();
            }
            $rootScope.reload = false;
            $scope.errorMessage = true;
            $scope.loginBtn = false;
            return false;
        });

    };
});

