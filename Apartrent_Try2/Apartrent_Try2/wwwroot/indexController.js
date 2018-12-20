var indexController = angular.module('indexController', []);

indexController.controller('indexController', function ($scope, $rootScope, $window, $location, userProfile) {

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

    $rootScope.showNav = false;

    $scope.openSideBar =async function () {
        document.getElementById("openNavButton").style.display = 'none';
        document.getElementById("sideBar").style.display = "block";
        document.getElementById("sideBar").style.width = "25%";
        document.getElementById("sideBar").style.marginRight ="0%";

        for (var i = 1; i <= 25; i++) {
            await $scope.sleep(13);
            document.getElementById("main").style.marginRight = (i + "%").toString();
            if (document.getElementById("sideBar").style.marginRight.valueOf() < 0)
            document.getElementById("sideBar").style.marginRight = (i + 30 + "%").toString();

        }
    };

    $scope.sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
});
