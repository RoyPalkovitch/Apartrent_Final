
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
        userProfile.getData();
    });

    $scope.newReview = function () {
        $scope.review = {
            userName: $scope.userDetails.userName,
            description: $scope.reviewDescription,
            rating: $scope.reviewRating,
            apartmentID: $scope.currentApartmentData.apartmentID
        };
        $http.post("api/reviews?password=" + $scope.userDetails.password, $scope.review).then(function (response) {
            if (response.data && response.data > 0) {
                $scope.review.reviewID = response.data;
                currentApartment.data.reviews.push($scope.review);
                currentApartment.getData();
            }
        
        });
    };

    $scope.deleteReview = function (review, index) {
        $scope.delReview = {
            userName: $scope.userDetails.userName,
            apartmentID: review.apartmentID,
            reviewID: review.reviewID
        };
        $http.post("api/reviews/Delete?password=" + $scope.userDetails.password,$scope.delReview).then(function (response) {
            if (response.data) {
                currentApartment.data.reviews.splice(index, 1);
                currentApartment.getData();
            }
        });

    };

    $scope.editReview = function (review, index) {
        $scope.editedReview = {
            userName: $scope.userDetails.userName,
            apartmentID: review.apartmentID,
            reviewID: review.reviewID,
            description: $scope.editDescription ? $scope.editDescription : review.description,
            rating: $scope.editRating ? $scope.editRating : review.rating
        };
        $scope.currentReview = -1;
        $http.put("api/reviews?password=" + $scope.userDetails.password, $scope.editedReview).then(function (response) {
            if (response.data) {
                currentApartment.data.reviews[index] = $scope.editedReview;
                currentApartment.getData();
            }

        });
    };

    $scope.editReviewHandler = function (index) {
        $scope.currentReview = index;
    };

});