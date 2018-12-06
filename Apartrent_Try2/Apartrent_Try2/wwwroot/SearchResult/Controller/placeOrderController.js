var placeOrdersController = angular.module('placeOrdersController', []);

placeOrdersController.controller('placeOrdersController', function ($scope, $http, $window,$rootScope) {

    if ($window.localStorage.getItem("userProfile")) {
        $rootScope.userDetails = JSON.parse($window.localStorage.getItem("userProfile"));
        $scope.newOrder = function (currentApartmentData) {
            $scope.order = {
                apartmentID: currentApartmentData.apartmentID,
                userName: $rootScope.userDetails.userName,
                renterUserName: currentApartmentData.renterUserName,
                fromDate: currentApartmentData.fromDate,
                toDate: currentApartmentData.toDate
            };

            $http.post("api/orders?password=" + $rootScope.userDetails.password, $scope.order).then(function (response) {
                if (response.data) {
                    $scope.successPurches = true;
                }
            });

        };
    }
    
});