var placeOrdersController = angular.module('placeOrdersController', []);

placeOrdersController.controller('placeOrdersController', function ($scope, $http, userProfile,$rootScope) {

    if ($rootScope.userDetails !== "" && $rootScope.userDetails !== undefined) {
       // $rootScope.userDetails = JSON.parse($window.localStorage.getItem("userProfile"));
        $scope.newOrder = function (currentApartmentData) {
            $scope.order = {
                apartmentID: currentApartmentData.apartmentID,
                renterUserName: currentApartmentData.renterUserName,
                fromDate: currentApartmentData.fromDate,
                toDate: currentApartmentData.toDate
            };

            $http.post("api/orders", $scope.order,userProfile.config).then(function (response) {
                if (response.data) {
                    $scope.successPurches = true;
                }
            });

        };
    }
    
});