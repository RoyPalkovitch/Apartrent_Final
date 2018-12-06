var currentUserApartmentViewController = angular.module('currentUserApartmentViewController', []);

currentUserApartmentViewController.controller('currentUserApartmentViewController', function ($scope, $rootScope, currentApartment, $http) {

    $rootScope.userDetails.currentApartment = currentApartment;

    $scope.getApartmentOrders = function () {

        if ($rootScope.userDetails.currentApartment.orders) {
            return;
        }
        $http.get("api/orders/ApartmentOrders?userName=" + $scope.userDetails.userName + "&password=" + $scope.userDetails.password + "&apartmentID=" + $rootScope.userDetails.currentApartment.apartmentID).then(function (response) {
            if (response.data) {
                return $scope.userDetails.currentApartment.orders = response.data;
            }
        });
    };



});