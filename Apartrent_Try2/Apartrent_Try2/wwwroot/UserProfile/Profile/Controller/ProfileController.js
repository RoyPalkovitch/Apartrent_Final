var profileController = angular.module('profileController', []);

profileController.controller('profileController', function ($scope, $window, $rootScope) {

    if ($window.localStorage.getItem("userProfile")) {
        $rootScope.userDetails = JSON.parse($window.localStorage.getItem("userProfile"));
    }
    if ($window.sessionStorage.getItem("countriesData")) {
        $scope.countries = JSON.parse($window.sessionStorage.getItem("countriesData"));
    }

    if ($window.sessionStorage.getItem("categoriesData")) {
        $scope.categories = JSON.parse($window.sessionStorage.getItem("categoriesData"));
    }

});
