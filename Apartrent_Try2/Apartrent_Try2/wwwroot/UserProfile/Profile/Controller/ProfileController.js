var profileController = angular.module('profileController', []);

profileController.controller('profileController', function ($scope, $window, $rootScope, userProfile) {
    if (!userProfile.data)
        return;
    if (userProfile.data) {
        // $rootScope.userDetails = JSON.parse($window.sessionStorage.getItem("userProfile"));
        $rootScope.userDetails = userProfile.data;
    }
    if ($window.sessionStorage.getItem("countriesData")) {
        $scope.countries = JSON.parse($window.sessionStorage.getItem("countriesData"));
    }

    if ($window.sessionStorage.getItem("categoriesData")) {
        $scope.categories = JSON.parse($window.sessionStorage.getItem("categoriesData"));
    }

});
