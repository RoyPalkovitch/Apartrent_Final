var addApartmentController = angular.module('addApartmentController', []);

addApartmentController.controller('addApartmentController', function ($scope, $http, userProfile, $rootScope, $location, imageHandlerFactory,dateHandlerFactory) {

    $scope.newApartmentPicture = ["/ApartrentPhotos/default-profile-image.png", null, null, null, null];
    $scope.changePicture = function (index) {
        $scope.index = index;
        if ($scope.newApartmentPicture[index] === null)
            $scope.newApartmentPicture[index] = "/ApartrentPhotos/default-profile-image.png";

    };
    $scope.index = 0;
    if ($rootScope.showNav === undefined)
        $rootScope.showNav = true;
    $scope.closeTopBar();
    $scope.addApartment = function (notRenterYet) {
        $scope.imagesData = imageHandlerFactory.sendImage($scope.newApartmentPicture);
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
            bedsDescription: $scope.bedsDescription,
            apartmentImage: $scope.imagesData.apartmentImage,
            apartmentImageType: $scope.imagesData.apartmentImageType
        };
        if ($scope.newApartment.categoryID < 1 || $scope.newApartment.categoryID > 2 || $scope.newApartment.countryID < 1 || $scope.newApartment.categoryID === undefined || $scope.newApartment.countryID === undefined ||
            $scope.newApartment.countryID > 5 || $scope.newApartment.address.length > 50 || $scope.newApartment.address.length < 5 || $scope.newApartment === undefined ||
            $scope.newApartment.description.length > 70 || $scope.newApartment.description.length < 5 || $scope.newApartment.numberOfGuests < 1 || $scope.newApartment.numberOfGuests > 20 ||
            $scope.newApartment.numberOfBedRooms < 1 || $scope.newApartment.livingRoomDescription.length > 70 || $scope.newApartment.livingRoomDescription.length < 5 ||
            $scope.newApartment.bedsDescription.length > 70 || $scope.newApartment.bedRoomDescription.length < 5 || $scope.newApartment.apartmentImage[0] === null ||
            $scope.newApartment.apartmentImageType[0] === null || $scope.newApartment.queenSizeBed < 0 || $scope.newApartment.doubleBed < 0 || $scope.newApartment.singleBed < 0 ||
            $scope.newApartment.sofaBed < 0) {
            $scope.addApartmentBtn = false;
            return;
        }
        $http.post("api/apartment", $scope.newApartment, userProfile.config).then(function (response) {
            $rootScope.reload = true;
            if (response.data) {
                response.data.fromDate = dateHandlerFactory.dateConverter(response.data.fromDate);
                response.data.toDate = dateHandlerFactory.dateConverter(response.data.toDate);
                $scope.newApartment.fromDate = response.data.fromDate;
                $scope.newApartment.toDate = response.data.toDate;
                $scope.newApartment.apartmentImage = imageHandlerFactory.constructImage($scope.newApartment.apartmentImageType, $scope.newApartment.apartmentImage)
                if (notRenterYet) {// add new apartment if the user wasnt renter before 
                    userProfile.updateToken();
                    $rootScope.role = 1;
                    $rootScope.userDetails.renterApartments = [];
                    $scope.newApartment.apartmentID = response.data.apartmentID;
                } else {
                    $scope.newApartment.apartmentID = response.data;
                }
                
                $scope.newApartment.apartmentType = $scope.categories[$scope.categoryID].apartmentType;
                $rootScope.userDetails.renterApartments.push($scope.newApartment);
                userProfile.setData($rootScope.userDetails);
                $rootScope.reload = false;
                $scope.addApartmentBtn = false;
                return $location.url("/Profile/UserApartments/userName=" + $rootScope.userDetails.userName);
            } else {
                $scope.addApartmentBtn = false;
                $rootScope.reload = false;

                return false; // need to make an error message
            }
        });
    };

});