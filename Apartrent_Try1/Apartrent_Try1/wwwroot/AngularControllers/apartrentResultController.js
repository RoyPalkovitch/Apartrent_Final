
var apartrentResultController = angular.module('apartrentResultController', []);

apartrentResultController.controller("apartrentResultController", function ($scope, $rootScope, $http, userProfile,currentApartment ,apartmentsDataForLocationService) {

    $scope.$on("getApartmentsData", function () { // the event is catch here and set the data to the controller from apartmentsDataForLocationService
        $scope.searchResult = apartmentsDataForLocationService.data;
    });

    $scope.$on("getUserData", function () {
        $scope.userDetails = userProfile.data;
    });

    $scope.getApartment = function (apartmentID,index) {
        $http.get('api/apartment/GetApartment?apartmentID=' + apartmentID).then(function (response) {
            if (response.data) {
                response.data.priceForStaying = $scope.searchResult[index].priceForStaying;
                response.data.pricePerDay = $scope.searchResult[index].pricePerDay;
                response.data.pricePerGuest = $scope.searchResult[index].pricePerGuest;
                currentApartment.setData(response.data);
                
            }
        });
    };

    $scope.$on("getCurrentApartment", function () {
        $scope.currentApartmentData = currentApartment.data;

    });

    $scope.newReview = function () {
        $scope.review = {
            userName: $scope.userDetails.userName,
            description: $scope.reviewDescription,
            rating: $scope.reviewRating,
            apartmentID: $scope.currentApartmentData.apartmentID
        };
        $http.post("api/reviews?password=" + $scope.userDetails.password, $scope.review).then(function (response) {
            if (response.data) {
                $scope.review.reviewID = response.data;
                $scope.currentApartmentData.reviews.Push($scope.review);
            }
        });
    };
});