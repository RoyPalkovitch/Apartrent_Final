var editController = angular.module('editAccountController', []);

editController.controller('editAccountController', function ($scope, $http, $rootScope, userProfile, imageHandlerFactory) {
    $scope.editAccBtn = false;

    $scope.closeTopBar();

    $scope.newProfilePic = $rootScope.userDetails.profileImage;

    $scope.editedCountryID = $rootScope.userDetails.countryID;

    $scope.editAccount = function () {
        $scope.editAccBtn = true;
        
        $scope.userEditedDetails = { // edited user object... 
            firstName: $scope.editFirstName ? $scope.editFirstName : $rootScope.userDetails.firstName, //checking if there is a value if no then the detail stay the same
            lastName: $scope.editLastName ? $scope.editLastName : $rootScope.userDetails.lastName,
            gender: $scope.editedGender ? $scope.editedGender : $rootScope.userDetails.gender,
            email: $scope.editEmail ? $scope.editEmail : $rootScope.userDetails.email,
            address: $scope.editedAddress ? $scope.editAddress : $rootScope.userDetails.address,
            countryID: $scope.editedCountryID ? $scope.editedCountryID : $rootScope.userDetails.countryID,
            phoneNumber: $scope.editedPhoneNumber ? $scope.editedPhoneNumber : $rootScope.userDetails.phoneNumber
        };
        if ($scope.userEditedDetails.countryID > 5 || $scope.userEditedDetails.countryID < 1 || $scope.userEditedDetails.address.length > 50 ||
            $scope.userEditedDetails.address.length < 3 || $scope.userEditedDetails.phoneNumber.length > 15 || $scope.userEditedDetails.phoneNumber.length < 5 || $scope.userEditedDetails.userName.length > 10 ||
            $scope.userEditedDetails.userName.length < 4 || $scope.userEditedDetails.password.length > 10 || $scope.userEditedDetails.password.length < 6 || $scope.userEditedDetails.email.length > 30 ||
            $scope.userEditedDetails.email.length < 7 || $scope.userEditedDetails.firstName.length > 11 || $scope.userEditedDetails.lastName.length > 11 ||
            !$scope.userEditedDetails.email.includes(".com") || !$scope.userEditedDetails.email.includes("@")) {
            $scope.editAccBtn = false;
            return;
        }


        $http.put("api/users", $scope.userEditedDetails, userProfile.config).then(function (successCallback, errorCallback) {
            $rootScope.reload = true;
            if (successCallback.data) {
                $rootScope.reload = false;
                $rootScope.userDetails.firstName = $scope.userEditedDetails.firstName;
                $rootScope.userDetails.lastName = $scope.userEditedDetails.lastName;
                $rootScope.userDetails.gender = $scope.userEditedDetails.gender;
                $rootScope.userDetails.email = $scope.userEditedDetails.email;
                $rootScope.userDetails.address = $scope.userEditedDetails.address;
                $rootScope.userDetails.countryID = $scope.userEditedDetails.countryID;
                $rootScope.userDetails.phoneNumber = $scope.userEditedDetails.phoneNumber;
                userProfile.setData($rootScope.userDetails);
                $scope.editAccBtn = false;
                $rootScope.reload = false;
                window.history.back();
                return;
            }
            $rootScope.reload = false;

        });
    };
    $scope.editProfileImage = function () {
        $scope.editAccBtn = true;
        $scope.newImage = imageHandlerFactory.sendImage($scope.newProfilePic);
        $http.put("api/users/UpdateProfileImage", $scope.newImage, userProfile.config).then(function (successCallback, errorCallback) {
            $rootScope.reload = true;
            if (successCallback) {
                $rootScope.reload = false;
                $rootScope.userDetails.profileImage = $scope.newProfilePic;
                userProfile.setData($rootScope.userDetails);
                $scope.newImage = false;
                $scope.editAccBtn = false;
            }
            $rootScope.reload = false;
        });

    };

    $scope.discardPicChange = function () {
        $scope.newImage = false;
        $scope.newProfilePic = $rootScope.userDetails.profileImage;
    };

    $scope.$parent.deleteoptOn = !$scope.$parent.deleteoptOn;

    $scope.$on('$destroy', function () {
        $scope.$parent.deleteoptOn = false;
    });

});