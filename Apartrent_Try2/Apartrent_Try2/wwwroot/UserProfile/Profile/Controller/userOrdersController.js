var userOrdersController = angular.module('userOrdersController', []);

userOrdersController.controller('userOrdersController', function ($rootScope, $scope, orders) {

     $scope.closeTopBar();
    $rootScope.userDetails.orders = orders;
});