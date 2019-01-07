var currentUserApartmentViewController = angular.module('currentUserApartmentViewController', []);

currentUserApartmentViewController.controller('currentUserApartmentViewController', function ($scope, $rootScope, currentApartment, $http, userProfile, dateHandlerFactory) {
    if ($rootScope.showNav === undefined)
        $rootScope.showNav = true;
    $scope.index = 0;

    $scope.changePicture = function (index) {
        $scope.index = index;
    };
    

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
                for (var i = 0; i < response.data.length; i++) {
                    response.data[i].fromDate = dateHandlerFactory.dateConvertor(response.data[i].fromDate);
                    response.data[i].toDate = dateHandlerFactory.dateConvertor(response.data[i].toDate);
                    response.data[i].orderDate = dateHandlerFactory.dateConvertor(response.data[i].orderDate);
                }
                return $scope.userDetails.currentApartment.orders = response.data;

            }
        });
    };



});