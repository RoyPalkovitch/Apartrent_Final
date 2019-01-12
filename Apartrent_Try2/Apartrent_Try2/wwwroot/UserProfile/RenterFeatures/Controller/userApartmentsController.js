var userApartmentsController = angular.module('userApartmentsController', []);

userApartmentsController.controller('userApartmentsController', function ($scope, $rootScope, $http, userProfile) {

    $scope.deleteApartmentBtn = false;
    $scope.closeTopBar();

    $scope.deleteApartment = function (apartmentIndex, apartmentID) {
        $scope.deleteApartmentBtn = true;
        if ($rootScope.userDetails.renterApartments[apartmentIndex].apartmentID !== apartmentID || apartmentID === undefined) {
            $scope.deleteApartmentBtn = false;
            return;
        }
        $http.delete("api/apartment?apartmentId=" + apartmentID, userProfile.config).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                $rootScope.reload = false;
                $rootScope.userDetails.renterApartments.splice(apartmentIndex, 1);
                userProfile.setData($rootScope.userDetails);
                $scope.deleteApartmentBtn = false;
            }
            $scope.deleteApartmentBtn = false;
            $rootScope.reload = false;
        });
    };

    

});