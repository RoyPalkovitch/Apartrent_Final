var currentUserApartmentViewController = angular.module('currentUserApartmentViewController', []);

currentUserApartmentViewController.controller('currentUserApartmentViewController', function ($scope, $rootScope, currentApartment, $http, userProfile) {
    if ($rootScope.showNav === undefined)
        $rootScope.showNav = true;
    $rootScope.userDetails.currentApartment = currentApartment;
    $scope.$on('$destroy', function () {
        $rootScope.showNav = false;
    });
    $scope.closeTopBar();
    $scope.getApartmentOrders = function () {

        if ($rootScope.userDetails.currentApartment.orders) {
            return;
        }
        $http.get("api/orders/ApartmentOrders?apartmentID=" + $rootScope.userDetails.currentApartment.apartmentID, userProfile.config).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                $rootScope.reload = false;
                return $scope.userDetails.currentApartment.orders = response.data;

            }
        });
    };



});