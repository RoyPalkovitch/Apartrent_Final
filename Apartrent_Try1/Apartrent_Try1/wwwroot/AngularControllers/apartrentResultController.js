
var apartrentResultController = angular.module('apartrentResultController', []);

apartrentResultController.controller("apartrentResultController", function ($scope, $rootScope, $http, currentApartment ,apartmentsDataForLocationService) {

    $scope.$on("getApartmentsData", function () { // the event is catch here and set the data to the controller from apartmentsDataForLocationService
        $scope.searchResult = apartmentsDataForLocationService.data;
    });

    $scope.getApartment = function (apartmentID) {
        $http.get('api/apartment/GetApartment?apartmentID=' + apartmentID).then(function (response) {
            if (response.data) {
                currentApartment.setData(response.data);
            }
        });
    };

    $scope.$on("getCurrentApartment", function () {
        $scope.currentApartmentData = currentApartment.data;

    });
});