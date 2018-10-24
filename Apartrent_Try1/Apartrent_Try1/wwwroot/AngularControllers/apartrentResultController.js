
var apartrentResultController = angular.module('ResultController', []);

apartrentResultController.controller("apartrentResultController", function ($scope, $rootScope, $http, apartmentsDataForLocationService) {

    $scope.$on("getApartmentsData", function () { // the event is catch here and set the data to the controller from apartmentsDataForLocationService
        $scope.searchResult = apartmentsDataForLocationService.data;
    });
});