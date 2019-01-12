var pendingOrdersController = angular.module('pendingOrdersController', []);

pendingOrdersController.controller('pendingOrdersController', function ($scope, $http, $rootScope, userProfile, $timeout) {

    $scope.changeStatusBtn = false;

    $scope.changeOrderStatus = function (order, tempApprove) {
        $scope.changeStatusBtn = true;
        order.approved = tempApprove;
        if (order.apartmentId < 1 || order.orderId < 1) {
            $scope.changeStatusBtn = false;
            return;
        }
        $http.put("api/orders", order, userProfile.config).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                $rootScope.userDetails.pendingOrders = response.data;
                $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
                $rootScope.reload = false;
                $scope.changeStatusBtn = false;
                userProfile.setData($rootScope.userDetails);
            }
            $rootScope.reload = false;
            $scope.changeStatusBtn = false;
        });
    };
    $scope.closeTopBar();

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