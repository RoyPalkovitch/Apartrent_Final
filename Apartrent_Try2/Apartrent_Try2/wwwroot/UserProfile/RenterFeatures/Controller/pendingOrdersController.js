var pendingOrdersController = angular.module('pendingOrdersController', []);

pendingOrdersController.controller('pendingOrdersController', function ($scope, $http, $rootScope, userProfile, $timeout) {

    $scope.changeOrderStatus = function (order, tempApprove) {
        order.approved = tempApprove;
        $http.put("api/orders", order, userProfile.config).then(function (response) {
            if (response.data) {
                $rootScope.userDetails.pendingOrders = response.data;
                $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
                userProfile.setData($rootScope.userDetails);
            }
        });
    };

    if ($rootScope.userDetails && $rootScope.role === 1) {
        $scope.getPending = function () {
            $http.get("api/orders/PendingOrders", userProfile.config).then(function (response) {
                if (response.data) {
                    $rootScope.userDetails.pendingOrders = response.data;
                    if ($rootScope.userDetails.pendingOrders) {

                        $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
                    }
                    userProfile.setData($rootScope.userDetails);
                    $timeout($scope.getPending, 1000);
                }
            });
        };

        $scope.getPending();
    }




});