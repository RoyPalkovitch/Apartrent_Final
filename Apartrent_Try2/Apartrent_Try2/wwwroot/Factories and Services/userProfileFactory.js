
var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("userProfile", function ($rootScope, $window, $http) {
    var userProfile = {};
    userProfile.data = '';

    userProfile.setData = function (data) {
        this.data = data;
        $window.sessionStorage.setItem('userProfile', JSON.stringify(userProfile.data));

        return this.getData();

    };


    userProfile.setToken = function (token) {
        if (token) {
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
    return userProfile;

});//will save the profile of the client