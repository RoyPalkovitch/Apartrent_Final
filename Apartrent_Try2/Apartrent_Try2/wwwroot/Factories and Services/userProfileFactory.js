
var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("userProfile", function ($rootScope, $window, $http) {
    var userProfile = {};   
    userProfile.data = '';
    
    userProfile.setData = function (data) {
        $window.localStorage.removeItem('userProfile');
        this.data = data;
        $window.localStorage.setItem('userProfile', JSON.stringify(userProfile.data));
        return this.getData();


    };


    userProfile.setToken = function (token) {
      //  $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
        $window.localStorage.setItem("userToken", JSON.stringify(token));
        var config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };
        userProfile.config = config;
        return;
    };

    userProfile.getData = function () {
         $rootScope.$broadcast('getUserData');
    };

    userProfile.resetData = function () {
        this.setData('');
        $window.localStorage.removeItem('userProfile');
        $window.localStorage.removeItem("userToken");

        this.getData();
    };
    return userProfile;

});//will save the profile of the client