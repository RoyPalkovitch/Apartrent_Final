var searchResultController = angular.module("searchResultController", []);
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

    $scope.sleep = function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    $scope.closeSideBar = async function () {

        for (var i = 25; i >= 1; i--) {
            await $scope.sleep(13);
            document.getElementById("main").style.marginRight = (i + "%").toString();
            document.getElementById("sideBar").style.marginRight = (i-30 + "%").toString();

        }
        document.getElementById("openNavButton").style.display = "inline-block";
        document.getElementById("sideBar").style.display = "none";

        
    };
});

