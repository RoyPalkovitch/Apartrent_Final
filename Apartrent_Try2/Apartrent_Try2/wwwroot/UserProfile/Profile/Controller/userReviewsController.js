var userReviewsController = angular.module('userReviewsController', []);

userReviewsController.controller('userReviewsController', function ($scope, $http,$rootScope,reviews) {

    $rootScope.userDetails.reviews = reviews; // data from resolve
    $scope.deleteReview = function (review, index) {
        $scope.delReview = {
            userName: $rootScope.userDetails.userName,
            apartmentID: review.apartmentID,
            reviewID: review.reviewID
        };
        $http.post("api/reviews/Delete?password=" + $rootScope.userDetails.password, $scope.delReview).then(function (response) {
            if (response.data) {
                $rootScope.userDetails.reviews.splice(index, 1);
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
        $http.put("api/reviews?password=" + $rootScope.userDetails.password, $scope.editedReview).then(function (response) {
            if (response.data) {
                $scope.currentReview = -1;
                $rootScope.userDetails.reviews[index] = $scope.editedReview;

            }

        });
    };

    $scope.editReviewHandler = function (index) {//Change the review view in the ui to see the apartment that being edit
        $scope.currentReview = index;
    };
});