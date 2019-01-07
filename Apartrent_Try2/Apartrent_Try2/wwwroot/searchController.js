
var searchController = angular.module("searchController", []);

var date = new Date();
searchController.controller('searchController', function ($scope, $window, $location) {
    $scope.fromDate = new Date(date);//today date for search
    if ($window.sessionStorage.getItem('countriesData')) { // if countries is available the promise of the startup as worked. 
        $scope.countries = JSON.parse($window.sessionStorage.getItem('countriesData'));//retriving countries data to controller
        $scope.categories = JSON.parse($window.sessionStorage.getItem('categoriesData'));//retriving categories data to controller
    }

    if ($location.url().includes("ViewApartment")) {
        $scope.lastSearch = JSON.parse($window.getItem("LastSearch"));
        $scope.searchCountryID = $scope.lastSearch.countryID;
        $scope.searchCheckIn = $scope.lastSearch.searchCheckIn;
        $scope.searchCheckOut = $scope.lastSearch.searchCheckOut;
        $scope.searchGuests = $scope.lastSearch.searchGuests;
    }
});
