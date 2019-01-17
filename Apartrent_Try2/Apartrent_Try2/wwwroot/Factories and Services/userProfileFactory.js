
var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("userProfile", function ($rootScope, $window, $http, $timeout) {
    var userProfile = {};
    userProfile.data = '';

    userProfile.setData = function (data) {
        this.data = data;
        $window.sessionStorage.setItem('userProfile', JSON.stringify(userProfile.data));

        return this.getData();

    };


    userProfile.setToken = function (token) {
        if (token) {
            this.refreshToken(true);
            $window.sessionStorage.setItem("userToken", JSON.stringify(token));
            var config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };
            userProfile.config = config;
            return true;
        }
        return false;
    };

    userProfile.getData = function () {
        $rootScope.$broadcast('getUserData');
    };

    userProfile.resetData = function () {
        this.setData('');
        $window.sessionStorage.removeItem('userProfile');
        $window.sessionStorage.removeItem("userToken");

        return this.getData();
    };

    userProfile.updateToken = function () {
        $http.get("api/Users/UpdateToken", userProfile.config).then(function (response) {
            if (response.data) {
                userProfile.setToken(response.data);
            }
        });
    };


    userProfile.refreshToken = function (firstTime) {
        
        if (!firstTime) {
            $http.get("api/Users/NewToken", userProfile.config).then(function (response) {
                if (response.data) {
                    userProfile.setToken(response.data);
                    $timeout(userProfile.refreshToken, 600000);
                }
            });
        }
        $timeout(this.refreshToken, 600000);
        firstTime = null;

    };
    return userProfile;

});//will save the profile of the client