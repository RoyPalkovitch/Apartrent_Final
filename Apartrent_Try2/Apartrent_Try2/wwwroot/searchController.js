
var searchController = angular.module("searchController", []);

var date = new Date();
searchController.controller('searchController', function ($scope, $window) {
    $scope.fromDate = new Date(date);//today date for search
    if ($window.sessionStorage.getItem('countriesData')) { // if countries is available the promise of the startup as worked. 
        $scope.countries = JSON.parse($window.sessionStorage.getItem('countriesData'));//retriving countries data to controller
        $scope.categories = JSON.parse($window.sessionStorage.getItem('categoriesData'));//retriving categories data to controller
    }

  
});
