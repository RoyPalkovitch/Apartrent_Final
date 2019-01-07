var placeOrdersController = angular.module('placeOrdersController', []);

placeOrdersController.controller('placeOrdersController', function ($scope, $http, userProfile, $rootScope) {
    $scope.purchBtn = false;
    if ($rootScope.userDetails !== "" && $rootScope.userDetails !== undefined) {
        $scope.newOrder = function (currentApartmentData) {
            $scope.purchBtn = true;
            $scope.order = {
                apartmentID: currentApartmentData.apartmentID,
                renterUserName: currentApartmentData.renterUserName,
                fromDate: currentApartmentData.fromDate,
                toDate: currentApartmentData.toDate
            };

            $http.post("api/orders", $scope.order, userProfile.config).then(function (response) {
                $rootScope.reload = true;
                $scope.purchBtn = false;
                if (response.data) {
                    $scope.successPurches = true;
                    $rootScope.reload = false;

                }
            });
            $scope.purchBtn = false;

        };
        
    }
    
});