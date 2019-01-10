var userOrdersController = angular.module('userOrdersController', []);

userOrdersController.controller('userOrdersController', function ($rootScope, $scope, orders, $http, userProfile) {

     $scope.closeTopBar();
    $rootScope.userDetails.orders = orders;
    $scope.deleteBtn = false;
    $scope.deleteOrder = function (orderID,index) {
        $scope.deleteBtn = true;
        $http.delete("api/orders?orderID=" + orderID, userProfile.config).then(function (response) {
            if (response.data > 0) {
                $scope.deleteBtn = false;
                $rootScope.userDetails.orders.splice(index, 1);
                return;
            }
            $scope.deleteBtn = false;

        });
    };
});