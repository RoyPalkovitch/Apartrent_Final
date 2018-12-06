var searchResultController = angular.module("searchResultController", []);

searchResultController.controller('searchResultController', function ($scope, apartmentsFactory, apartmentsData) {
    $scope.searchResult = apartmentsData;
    
    $scope.setApartmentData = function (data) { //save the search parametes of the apartments that has been choosen to display in the html

        apartmentsFactory.lastSearchParams(data);
    };
});

