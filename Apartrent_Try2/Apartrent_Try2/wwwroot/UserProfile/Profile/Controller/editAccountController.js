var editController = angular.module('editAccountController', []);

editController.controller('editAccountController', function ($scope, $http, $rootScope, userProfile) {

    $scope.editAccount = function () {
        $scope.userEditedDetails = { // edited user object... 
            firstName: $scope.editFirstName ? $scope.editFirstName : $rootScope.userDetails.firstName, //checking if there is a value if no then the detail stay the same
            lastName: $scope.editLastName ? $scope.editLastName : $rootScope.userDetails.lastName,
            gender: $scope.editedGender ? $scope.editedGender : $rootScope.userDetails.gender,
            email: $scope.editEmail ? $scope.editEmail : $rootScope.userDetails.email,
            address: $scope.editedAddress ? $scope.editAddress : $rootScope.userDetails.address,
            countryID: $scope.editedCountryID ? $scope.editedCountryID : $rootScope.userDetails.countryID,
            phoneNumber: $scope.editedPhoneNumber ? $scope.editedPhoneNumber : $rootScope.userDetails.phoneNumber,
            userName: $rootScope.userDetails.userName
        };

        $http.put("api/users", $scope.userEditedDetails, userProfile.config).then(function (successCallback, errorCallback) {
            if (successCallback.data) {
                $rootScope.userDetails.firstName = $scope.userEditedDetails.firstName;
                $rootScope.userDetails.lastName = $scope.userEditedDetails.lastName;
                $rootScope.userDetails.gender = $scope.userEditedDetails.gender;
                $rootScope.userDetails.email = $scope.userEditedDetails.email;
                $rootScope.userDetails.address = $scope.userEditedDetails.address;
                $rootScope.userDetails.countryID = $scope.userEditedDetails.countryID;
                $rootScope.userDetails.phoneNumber = $scope.userEditedDetails.phoneNumber;
                userProfile.setData($rootScope.userDetails);
                window.history.back();
                return;
            }
        });
    };

    $scope.$parent.deleteoptOn = !$scope.$parent.deleteoptOn;

    $scope.$on('$destroy', function () {
        $scope.$parent.deleteoptOn = false;
    });

});