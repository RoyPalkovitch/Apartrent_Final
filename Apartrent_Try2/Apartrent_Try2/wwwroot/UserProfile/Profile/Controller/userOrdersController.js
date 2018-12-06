var userOrdersController = angular.module('userOrdersController', []);

userOrdersController.controller('userOrdersController', function ($rootScope, orders) {


    $rootScope.userDetails.orders = orders;

});