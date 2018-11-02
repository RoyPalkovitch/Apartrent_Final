

var apartmentController = angular.module('apartmentController', []);

apartmentController.controller('apartmentController', function ($scope, $rootScope, $http, userProfile, countriesService, categoriesFactory, $routeParams) {

    $scope.userDetails = userProfile.data;
    $scope.categories = categoriesFactory.data;
    $rootScope.viewProfile = false;

    $scope.$on("getUserData", function () {//event catch for user who just login to save his data
        $scope.userDetails = userProfile.data;
    });

    $scope.$on("categoriesFactory", function () {
        $scope.categories = categoriesFactory.data;
    });


    $scope.deleteApartment = function (apartmentIndex, apartmentID) {
        $http.delete("api/apartment?apartmentId=" + apartmentID + "&userName=" + $scope.userDetails.userName + "&password=" + $scope.userDetails.password).then(function (response) {
            if (response.data) {
                $scope.userDetails.renterApartments.splice(apartmentIndex, apartmentIndex);
                userProfile.setData($scope.userDetails);
            }
        });
    };

    $scope.addApartment = function () {
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
        $http.post("api/apartment?userName=" + userProfile.data.userName + "&password=" + userProfile.data.password, $scope.newApartment).then(function (response) {
            if (response) {
                $scope.newApartment.apartmentID = response.data;
                userProfile.data.renterApartments.push($scope.newApartment); //send it to db
                $scope.userDetails = userProfile.getData();
                return true;
            } else {
                alert();
                return false; // need to make an error message
            }
        });
    };

    $scope.getIndex = function (apartmentIndex) {
        $scope.userDetails.currentApartment = $scope.userDetails.renterApartments[apartmentIndex];
        $scope.userDetails.tempIndex = apartmentIndex;
    };
    $scope.editApartment = function () {
        $scope.editedApartment = {// add new apartment object
            apartmentID: $scope.userDetails.currentApartment.apartmentID,
            categoryID: $scope.editCategoryID ? $scope.editCategoryID : $scope.userDetails.currentApartment.categoryID,
            countryID: $scope.editCountryID ? $scope.editCountryID : $scope.userDetails.currentApartment.countryID,
            address: $scope.editAddress ? $scope.editAddress : $scope.userDetails.currentApartment.address,
            fromDate: $scope.editFromDate ? $scope.editFromDate.toDateString() : $scope.userDetails.currentApartment.fromDate,
            toDate: $scope.editToDate ? $scope.editToDate.toDateString() : $scope.userDetails.currentApartment.toDate,
            pricePerDay: $scope.editPricePerDay ? $scope.editPricePerDay : $scope.userDetails.currentApartment.pricePerDay,
            description: $scope.editDescription ? $scope.editDescription : $scope.userDetails.currentApartment.description,
            numberOfGuests: $scope.editNumberOfGuests ? $scope.editNumberOfGuests : $scope.userDetails.currentApartment.numberOfGuests,
            shower: $scope.editIsShower ? $scope.editIsShower : $scope.userDetails.currentApartment.shower,
            bath: $scope.editIsBath ? $scope.editIsBath : $scope.userDetails.currentApartment.bath,
            wifi: $scope.editIsWIFI ? $scope.editIsWIFI : $scope.userDetails.currentApartment.wifi,
            tv: $scope.editIsTV ? $scope.editIsTV : $scope.userDetails.currentApartment.tv,
            cables: $scope.editIsCable ? $scope.editIsCable : $scope.userDetails.currentApartment.cables,
            satellite: $scope.editIsSatellite ? $scope.editIsSatellite : $scope.userDetails.currentApartment.satellite,
            pets: $scope.editIsPets ? $scope.editIsPets : $scope.userDetails.currentApartment.pets,
            numberOfBedRooms: $scope.editNumberOfBedRooms ? $scope.editNumberOfBedRooms : $scope.userDetails.currentApartment.numberOfBedRooms,
            livingRoom: $scope.editIsLivingRoom ? $scope.editIsLivingRoom : $scope.userDetails.currentApartment.livingRoom,
            bedRoomDescription: $scope.editBedRoomDescription ? $scope.editBedRoomDescription : $scope.userDetails.currentApartment.bedRoomDescription,
            livingRoomDescription: $scope.editLivingRoomDescription ? $scope.editLivingRoomDescription : $scope.userDetails.currentApartment.livingRoomDescription,
            queenSizeBed: $scope.editQueenSizeBed ? $scope.editQueenSizeBed : $scope.userDetails.currentApartment.queenSizeBed,
            doubleBed: $scope.editDoubleBed ? $scope.editDoubleBed : $scope.userDetails.currentApartment.doubleBed,
            singleBed: $scope.editSingleBed ? $scope.editSingleBed : $scope.userDetails.currentApartment.singleBed,
            sofaBed: $scope.editSofaBed ? $scope.editSofaBed : $scope.userDetails.currentApartment.sofaBed,
            bedsDescription: $scope.editBedsDescription ? $scope.editBedsDescription : $scope.userDetails.currentApartment.bedsDescription
        };

        $http.put("api/apartment?editFeature=" + $scope.showFeatures + "&userName=" + $scope.userDetails.userName + "&password=" + $scope.userDetails.password, $scope.editedApartment)
            .then(function (response) {
                if (response.data) {
                    $scope.userDetails.currentApartment = '';
                    userProfile.data.renterApartments[$scope.userDetails.tempIndex] = $scope.editedApartment;
                    return;
                }
            });
    };
});