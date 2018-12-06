
var loginController = angular.module('loginController', []);

loginController.controller("loginController", function ($scope, $http, userProfile, loginFactory) {

    $scope.login = function () { //login vadilation through get request
        userProfile.resetData();
         loginFactory.setData($scope.loginUserName, $scope.loginPassword);
    };
});