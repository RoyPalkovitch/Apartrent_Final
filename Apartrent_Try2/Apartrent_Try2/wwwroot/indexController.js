var indexController = angular.module('indexController', []);

indexController.controller('indexController', function ($scope, $rootScope, $window, $location, userProfile, $http) {

    $rootScope.userDetails;
    $scope.$on('getUserData', function () {
        $rootScope.userDetails = userProfile.data;
        if ($rootScope.userDetails.pendingNotification)
            $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
    });

    $scope.checkIfLogin = function () {
        if ($window.localStorage.getItem('userProfile')) {
            $scope.temp = JSON.parse($window.localStorage.getItem('userProfile'));
            $http.get('api/users/login?userName=' + $scope.temp.userName + '&password=' + $scope.temp.password).then(function (response) {
                if (response.data) {
                    response.data.password = $scope.temp.password;// all the userProfile will be in token for now i need to save the password like this
                    if (response.data.role === 1 && response.data.pendingOrders !== null)
                        response.data.pendingNotification = response.data.pendingOrders.length;
                    userProfile.setData(response.data); //save data in factory
                    $rootScope.role = response.data.role;
                }
            });
        }
    };

    $scope.checkIfLogin();

    $scope.logOut = function () {
        $rootScope.role = undefined;
        userProfile.resetData();
        if ($location.path().includes("/Profile"))
            return $location.url('/index');
        return;
    };
});




