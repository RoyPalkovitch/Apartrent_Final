var userApartmentsController = angular.module('userApartmentsController', []);

userApartmentsController.controller('userApartmentsController', function ($scope, $rootScope, $http, userProfile) {

    $scope.deleteApartment = function (apartmentIndex, apartmentID) {
        $http.delete("api/apartment?apartmentId=" + apartmentID + "&userName=" + $rootScope.userDetails.userName + "&password=" + $rootScope.userDetails.password).then(function (response) {
            if (response.data) {
                $rootScope.userDetails.renterApartments.splice(apartmentIndex, 1);
                userProfile.setData($rootScope.userDetails);
            }
        });
    };

    

});