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
        $http.put("api/users", $scope.userEditedDetails).then(function (response) {
            if (response.data) {
                userProfile.setData($scope.userEditedDetails);
                window.history.back();
                return;
            }
        });

    };

});