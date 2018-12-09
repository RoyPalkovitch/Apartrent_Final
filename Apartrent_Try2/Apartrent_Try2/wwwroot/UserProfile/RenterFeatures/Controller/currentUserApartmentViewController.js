var currentUserApartmentViewController = angular.module('currentUserApartmentViewController', []);

currentUserApartmentViewController.controller('currentUserApartmentViewController', function ($scope, $rootScope, currentApartment, $http, userProfile) {

    $rootScope.userDetails.currentApartment = currentApartment;

    $scope.getApartmentOrders = function () {

        if ($rootScope.userDetails.currentApartment.orders) {
            return;
        }
        $http.get("api/orders/ApartmentOrders?apartmentID=" + $rootScope.userDetails.currentApartment.apartmentID, userProfile.config).then(function (response) {
            if (response.data) {
                return $scope.userDetails.currentApartment.orders = response.data;
            }
        });
    };



});