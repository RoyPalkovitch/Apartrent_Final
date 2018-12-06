var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("countriesService", function ($rootScope,$window) {
    var countriesData = {};

    countriesData.setData = function (data) {
       
        $window.sessionStorage.setItem('countriesData', JSON.stringify(data)); 
        this.getData();
    };

    countriesData.getData = function () {
        $rootScope.$broadcast("getCountries");
    };

    countriesData.resetData = function () {
        $window.sessionStorage.removeItem('countriesData'); 
    };

    return countriesData;


});