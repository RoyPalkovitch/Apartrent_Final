


var registerController = angular.module('registerController', []);

registerController.controller('registerController', function ($scope, $http, $location, $window, $rootScope) {
    if ($window.sessionStorage.getItem("userToken"))
        $location.url("index");

    if ($window.sessionStorage.getItem('countriesData')) {
        $scope.countries = JSON.parse($window.sessionStorage.getItem('countriesData'));
    }

    if ($rootScope.userDetails || $rootScope.userDetails === "Just Register") {
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
        if ($scope.newUser.userName.length > 10 || $scope.newUser.password.length > 10 ||
            $scope.newUser.address.length > 50 || $scope.newUser.phoneNumber.length > 15 ||
            $scope.newUser.email.includes("@") === false || $scope.newUser.email.includes(".com") === false
            || $scope.newUser.email.length > 50) {
            return $scope.errorMessage = true;
        }
        $http.post('api/Users', $scope.newUser).then(function (response) {
            $rootScope.reload = true;
            if (response.data) { //post request for signup and clear the inputs
                $rootScope.userDetails = "Just Register";
                $scope.newUserName = "";
                $scope.newPassword = "";
                $scope.newGender = "";
                $scope.newAddress = "";
                $scope.newPhoneNumber = "";
                $scope.newFirstName = "";
                $scope.newEmail = "";
                $scope.newLastName = "";
                $scope.newCountryID = "";
                $rootScope.reload = false;

                $location.url('/Login');
            }
            return $scope.errorMessage = true;
        });
    };

    

});

