var editApartmentController = angular.module('editApartmentController', []);

editApartmentController.controller('editApartmentController', function ($scope, $http, $transition$,$location,$rootScope) {

    $rootScope.userDetails.currentApartment = $rootScope.userDetails.renterApartments[$transition$.params().apartmentIndex];

    $scope.editApartment = function () {
        $scope.editedApartment = {// add new apartment object
            apartmentID: $rootScope.userDetails.currentApartment.apartmentID,
            categoryID: $scope.editCategoryID ? $scope.editCategoryID : $rootScope.userDetails.currentApartment.categoryID,
            countryID: $scope.editCountryID ? $scope.editCountryID : $rootScope.userDetails.currentApartment.countryID,
            address: $scope.editAddress ? $scope.editAddress : $rootScope.userDetails.currentApartment.address,
            fromDate: $scope.editFromDate ? $scope.editFromDate.toDateString() : $rootScope.userDetails.currentApartment.fromDate,
            toDate: $scope.editToDate ? $scope.editToDate.toDateString() : $rootScope.userDetails.currentApartment.toDate,
            pricePerDay: $scope.editPricePerDay ? $scope.editPricePerDay : $rootScope.userDetails.currentApartment.pricePerDay,
            description: $scope.editDescription ? $scope.editDescription : $rootScope.userDetails.currentApartment.description,
            numberOfGuests: $scope.editNumberOfGuests ? $scope.editNumberOfGuests : $rootScope.userDetails.currentApartment.numberOfGuests,
            shower: $scope.editIsShower ? $scope.editIsShower : $rootScope.userDetails.currentApartment.shower,
            bath: $scope.editIsBath ? $scope.editIsBath : $rootScope.userDetails.currentApartment.bath,
            wifi: $scope.editIsWIFI ? $scope.editIsWIFI : $rootScope.userDetails.currentApartment.wifi,
            tv: $scope.editIsTV ? $scope.editIsTV : $rootScope.userDetails.currentApartment.tv,
            cables: $scope.editIsCable ? $scope.editIsCable : $rootScope.userDetails.currentApartment.cables,
            satellite: $scope.editIsSatellite ? $scope.editIsSatellite : $rootScope.userDetails.currentApartment.satellite,
            pets: $scope.editIsPets ? $scope.editIsPets : $rootScope.userDetails.currentApartment.pets,
            numberOfBedRooms: $scope.editNumberOfBedRooms ? $scope.editNumberOfBedRooms : $rootScope.userDetails.currentApartment.numberOfBedRooms,
            livingRoom: $scope.editIsLivingRoom ? $scope.editIsLivingRoom : $rootScope.userDetails.currentApartment.livingRoom,
            bedRoomDescription: $scope.editBedRoomDescription ? $scope.editBedRoomDescription : $rootScope.userDetails.currentApartment.bedRoomDescription,
            livingRoomDescription: $scope.editLivingRoomDescription ? $scope.editLivingRoomDescription : $rootScope.userDetails.currentApartment.livingRoomDescription,
            queenSizeBed: $scope.editQueenSizeBed ? $scope.editQueenSizeBed : $rootScope.userDetails.currentApartment.queenSizeBed,
            doubleBed: $scope.editDoubleBed ? $scope.editDoubleBed : $rootScope.userDetails.currentApartment.doubleBed,
            singleBed: $scope.editSingleBed ? $scope.editSingleBed : $rootScope.userDetails.currentApartment.singleBed,
            sofaBed: $scope.editSofaBed ? $scope.editSofaBed : $rootScope.userDetails.currentApartment.sofaBed,
            bedsDescription: $scope.editBedsDescription ? $scope.editBedsDescription : $rootScope.userDetails.currentApartment.bedsDescription
        };
        if ($scope.showFeatures === undefined)
            $scope.showFeatures = false;
        $http.put("api/apartment?editFeature=" + $scope.showFeatures + "&userName=" + $rootScope.userDetails.userName + "&password=" + $rootScope.userDetails.password, $scope.editedApartment)
            .then(function (response) {
                if (response.data) {
                    $rootScope.userDetails.currentApartment = '';
                    $rootScope.userDetails.renterApartments[$transition$.params().apartmentIndex] = $scope.editedApartment;
                    return $location.url("/Profile/UserApartments/userName=" + $rootScope.userDetails.userName);

                }
            });
    };
});