var searchedApartmentReviewsController = angular.module('searchedApartmentReviewsController', []);

searchedApartmentReviewsController.controller('searchedApartmentReviewsController', function ($scope, $window, $http, $rootScope) {


    if ($window.localStorage.getItem("userProfile")) {
        $rootScope.userDetails = JSON.parse($window.localStorage.getItem("userProfile"));

        $scope.newReview = function (apartmentID) {
            $scope.review = {
                userName: $rootScope.userDetails.userName,
                description: $scope.reviewDescription,
                rating: $scope.reviewRating,
                apartmentID: apartmentID
            };
            $http.post("api/reviews?password=" + $rootScope.userDetails.password, $scope.review).then(function (response) {
                if (response.data && response.data > 0) {
                    $scope.review.reviewID = response.data;
                    $scope.reviewDescription = '';
                    $rootScope.$broadcast("AddReview", { review: $scope.review }); // all the events catches in viewApartmentController
                }

            });
        };

        $scope.deleteReview = function (review, index) {
            $scope.delReview = {
                userName: $rootScope.userDetails.userName,
                apartmentID: review.apartmentID,
                reviewID: review.reviewID
            };
            $http.post("api/reviews/Delete?password=" + $rootScope.userDetails.password, $scope.delReview).then(function (response) {
                if (response.data) {
                    $rootScope.$broadcast("DeleteReview", { delData: index });
                }
            });
        };

        $scope.editReview = function (review, index) {
            $scope.editedReview = {
                userName: $rootScope.userDetails.userName,
                apartmentID: review.apartmentID,
                reviewID: review.reviewID,
                description: $scope.editDescription ? $scope.editDescription : review.description,
                rating: $scope.editRating ? $scope.editRating : review.rating
            };
            $scope.currentReview = -1;
            $http.put("api/reviews?password=" + $rootScope.userDetails.password, $scope.editedReview).then(function (response) {
                if (response.data) {
                    $rootScope.$broadcast("EditReview", { reviewIndex: index, reviewData: $scope.editedReview });
                }

            });
        };

        $scope.editReviewHandler = function (index) {//Change the review view in the ui to see the apartment that being edit
            $scope.currentReview = index;
        };
    }

});