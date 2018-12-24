﻿var searchResultController = angular.module("searchResultController", []);
searchResultController.controller('searchResultController', function ($scope, $rootScope, apartmentsFactory, apartmentsData, $location) {
    if (!apartmentsData)
        apartmentsData = null;
    $scope.searchResult = apartmentsData;

    $scope.setApartmentData = function (data) { //save the search parametes of the apartments that has been choosen to display in the html

        apartmentsFactory.lastSearchParams(data);
    };


    if ($location.path().includes("SearchResult/"))
         $rootScope.showNav = true;

    $scope.$on('$destroy', function () {
        $rootScope.showNav = false;
    });


    $scope.closeSideBar = async function () {

        document.getElementById("mySidebar").style.display = "none";
    };
});

