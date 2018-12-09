﻿var pendingOrdersController = angular.module('pendingOrdersController', []);

pendingOrdersController.controller('pendingOrdersController', function ($scope, $http, $rootScope, userProfile) {

    $scope.changeOrderStatus = function (order,tempApprove) {
        order.approved = tempApprove;
        $http.put("api/orders", order, userProfile.config).then(function (response) {
            if (response.data) {
                $rootScope.userDetails.pendingOrders = response.data;
                $rootScope.userDetails.pendingNotification = $rootScope.userDetails.pendingOrders.length;
                userProfile.setData($rootScope.userDetails);
            }
        });
    };

});