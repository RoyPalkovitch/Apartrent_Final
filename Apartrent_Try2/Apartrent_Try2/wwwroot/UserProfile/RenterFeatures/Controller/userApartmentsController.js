var userApartmentsController = angular.module('userApartmentsController', []);

userApartmentsController.controller('userApartmentsController', function ($scope, $rootScope, $http, userProfile) {

    
    $scope.deleteApartment = function (apartmentIndex, apartmentID) {
        //if (apartmentID !== Number)
        //    return;
        $scope.closeTopBar();
        $http.delete("api/apartment?apartmentId=" + apartmentID, userProfile.config).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                $rootScope.reload = false;
                $rootScope.userDetails.renterApartments.splice(apartmentIndex, 1);
                userProfile.setData($rootScope.userDetails);
            }
            
        });
    };

    

});