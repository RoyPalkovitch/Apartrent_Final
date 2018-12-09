var addApartmentController = angular.module('addApartmentController', []);

addApartmentController.controller('addApartmentController', function ($scope, $http, userProfile, $rootScope, $location) {


    $scope.addApartment = function (notRenterYet) {
        $scope.newApartment = {// add new apartment object
            categoryID: $scope.categoryID,
            countryID: $scope.countryID,
            address: $scope.address,
            fromDate: $scope.availableFromDate.toDateString(),
            toDate: $scope.availableToDate.toDateString(),
            pricePerDay: $scope.pricePerDay,
            description: $scope.description,
            numberOfGuests: $scope.numberOfGuests,
            shower: $scope.isShower ? $scope.isShower : false,
            bath: $scope.isBath ? $scope.isBath : false,
            wifi: $scope.isWIFI ? $scope.isWIFI : false,
            tv: $scope.isTV ? $scope.isWIFI : false,
            cables: $scope.isCable ? $scope.isCable : false,
            satellite: $scope.isSatellite ? $scope.isSatellite : false,
            pets: $scope.isPets ? $scope.isPets : false,
            numberOfBedRooms: $scope.numberOfBedRooms,
            livingRoom: $scope.isLivingRoom ? $scope.isLivingRoom : false,
            bedRoomDescription: $scope.bedRoomDescription,
            livingRoomDescription: $scope.livingRoomDescription,
            queenSizeBed: $scope.queenSizeBed ? $scope.queenSizeBed : 0,
            doubleBed: $scope.doubleBed ? $scope.doubleBed : 0,
            singleBed: $scope.singleBed ? $scope.singleBed : 0,
            sofaBed: $scope.sofaBed ? $scope.sofaBed : 0,
            bedsDescription: $scope.bedsDescription
        };
        
        $http.post("api/apartment", $scope.newApartment, userProfile.config).then(function (response) {
            if (response.data) {
                if (notRenterYet) {// add new apartment if the user wasnt renter before 
                    userProfile.setToken(response.data.token);
                    $rootScope.role = 1;
                    $rootScope.userDetails.renterApartments = [];
                    $scope.newApartment.apartmentID = response.data.apartmentID;
                } else {

                    $scope.newApartment.apartmentID = response.data;
                }
                $rootScope.userDetails.renterApartments.push($scope.newApartment);
                userProfile.setData($rootScope.userDetails);
                return $location.url("/Profile/UserApartments/userName=" + $rootScope.userDetails.userName);
            } else {
                return false; // need to make an error message
            }
        });
    };

});