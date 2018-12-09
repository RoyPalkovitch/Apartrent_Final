var indexController = angular.module('indexController', []);

indexController.controller('indexController', function ($scope, $rootScope, $window, $location, userProfile, $http) {

    $rootScope.userDetails;
    $scope.$on('getUserData', function () {
        $rootScope.userDetails = userProfile.data;
        if ($rootScope.userDetails.pendingNotification)
            $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
    });

    $scope.checkIfLogin = function () {
        if (userProfile.setToken(JSON.parse($window.sessionStorage.getItem('userToken')))) {
            userProfile.setData(JSON.parse($window.sessionStorage.getItem("userProfile")));
            $rootScope.role = $rootScope.userDetails.role;
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
