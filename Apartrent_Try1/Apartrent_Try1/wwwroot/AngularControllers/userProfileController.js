
var userProfileController = angular.module('userProfileController', []);




userProfileController.controller("userProfileController", function ($scope, $rootScope, $http, userProfile, countriesService, categoriesFactory) {
    $scope.userDetails = userProfile.data;
    $scope.categories = categoriesFactory.data;
    $rootScope.viewProfile = false;


    $scope.$on("getUserData", function () {//event catch for user who just login to save his data
        $scope.userDetails = userProfile.data;
    });

    $scope.$on("categoriesFactory", function () {
        $scope.categories = categoriesFactory.data;
    });


    $scope.editAccount = function () {
        $scope.userEditedDetails = { // edited user object... 
            firstName: $scope.editFirstName ? $scope.editFirstName : $scope.userDetails.firstName, //checking if there is a value if no then the detail stay the same
            lastName: $scope.editLastName ? $scope.editLastName : $scope.userDetails.lastName,
            gender: $scope.editedGender ? $scope.editedGender : $scope.userDetails.gender,
            email: $scope.editEmail ? $scope.editEmail : $scope.userDetails.email,
            address: $scope.editedAddress ? $scope.editAddress : $scope.userDetails.address,
            countryID: $scope.editedCountryID ? $scope.editedCountryID : $scope.userDetails.countryID,
            phoneNumber: $scope.editedPhoneNumber ? $scope.editedPhoneNumber : $scope.userDetails.phoneNumber,
            userName: $scope.userDetails.userName
        };
        $http.put("api/users", $scope.userEditedDetails).then(function (response) {
            if (response.data) {
                userProfile.data.firstName = $scope.userEditedDetails.firstName;//updating userProfile
                userProfile.data.lastName = $scope.userEditedDetails.lastName;//updating userProfile
                userProfile.data.gender = $scope.userEditedDetails.gender;//updating userProfile
                userProfile.data.email = $scope.userEditedDetails.email;//updating userProfile
                userProfile.data.address = $scope.userEditedDetails.address;//updating userProfile
                userProfile.data.countryID = $scope.userEditedDetails.countryID;//updating userProfile
                userProfile.data.phoneNumber = $scope.userEditedDetails.phoneNumber;//updating userProfile
                userProfile.data.userName = $scope.userEditedDetails.userName;//updating userProfile                        
                return;
            }
        });

    };

    $scope.becomeRenter = function () {

        $http.post("api/renter", { userName: userProfile.data.userName, password: userProfile.data.password }).then(function (response) {
            if (response.data) {//if user is validate renter then addApartmnet is being called if it return true then all good if not renter status delete
                if ($scope.addApartment()) {
                    $rootScope.role = 1;
                    return;
                }
                else {
                    alert("something went wrong renter options delete");
                    $scope.deleteRenterStatus();
                    $rootScope.role = 0;

                    return;
                }
            } else {
                alert("error with become renter");
                return;
            }
        });
    };

    $scope.deleteRenterStatus = function () {//delete request to make user quit being a renter
        $http.delete("api/renter", { userName: userProfile.userName, password: userProfile.password }).then(function (response) {
            if (response) {
                return;
            } else {
                return;
            }
        });
    };




    $scope.addApartment = function () {
        $scope.newApartment = {// add new apartment object
            categoryID: $scope.categoryID,
            countryID: $scope.countryID,
            address: $scope.address,
            FromDate: $scope.availableFromDate.toDateString(),
            ToDate: $scope.availableToDate.toDateString(),
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
                userProfile.data.renterApartments.push(response.data); //send it to db
                return true;
            } else {
                alert();
                return false; // need to make an error message
            }
        });
    };
});