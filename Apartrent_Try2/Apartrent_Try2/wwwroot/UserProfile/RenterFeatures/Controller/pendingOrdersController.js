var pendingOrdersController = angular.module('pendingOrdersController', []);

pendingOrdersController.controller('pendingOrdersController', function ($scope, $http, $rootScope, userProfile) {

    $scope.changeOrderStatus = function (order,tempApprove) {
        order.approved = tempApprove;
        order.renterUserName = $rootScope.userDetails.userName;
        $http.put("api/orders?password=" + $rootScope.userDetails.password, order).then(function (response) {
            if (response.data) {
                $rootScope.userDetails.pendingOrders = response.data;
                $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
                userProfile($rootScope.userDetails);
            }
        });
    };

});