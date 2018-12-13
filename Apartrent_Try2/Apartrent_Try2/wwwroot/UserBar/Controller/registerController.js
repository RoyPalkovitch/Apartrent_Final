


var registerController = angular.module('registerController', []);

registerController.controller('registerController', function ($scope, $http, $location, $window, $rootScope) {


    if ($window.sessionStorage.getItem('countriesData')) {
        $scope.countries = JSON.parse($window.sessionStorage.getItem('countriesData'));
    }

    if ($rootScope.userDetails) {
        $location.url('/index');
    }

    $scope.signUp = function () {
        $scope.newUser = { // new user object
            userName: $scope.newUserName,
            password: $scope.newPassword,
            gender: $scope.newGender,
            address: $scope.newAddress,
            phoneNumber: $scope.newPhoneNumber,
            email: $scope.newEmail,
            firstName: $scope.newFirstName,
            lastName: $scope.newLastName,
            CountryID: $scope.newCountryID

        };
        $http.post('api/Users', $scope.newUser).then(function (response) {
            if (response.data) { //post request for signup and clear the inputs
                $rootScope.userDetails = "Just Register";
                $location.url('/Login');
            }
        });
    };

});

