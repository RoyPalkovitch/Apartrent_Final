
var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("userProfile", function ($rootScope, $window) {
    var userProfile = {};   
    userProfile.data = '';
    userProfile.setData = function (data) {
        $window.localStorage.removeItem('userProfile');
        this.data = data;
        $window.localStorage.setItem('userProfile', JSON.stringify(userProfile.data));
        return this.getData();


    };

    userProfile.getData = function () {
         $rootScope.$broadcast('getUserData');
    };

    userProfile.resetData = function () {
        this.setData('');
        $window.localStorage.removeItem('userProfile');
        this.getData();
    };
    return userProfile;

});//will save the profile of the client