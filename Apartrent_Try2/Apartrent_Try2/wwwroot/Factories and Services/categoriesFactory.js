
var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("categoriesFactory", function ($rootScope) {
    var categories = {};

    categories.data = '';
    categories.setData = function (data) {
        this.data = data;
        this.getData();
    };

    categories.getData = function () {
        $rootScope.$broadcast('getCategories');
    };



    categories.resetData = function () {
        categories.data = '';
    };

    return categories;
});