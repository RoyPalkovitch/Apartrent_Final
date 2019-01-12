var userReviewsController = angular.module('userReviewsController', []);

userReviewsController.controller('userReviewsController', function ($scope, $http,$rootScope,reviews,userProfile) {
    $scope.editRevbtn = false;
    $rootScope.userDetails.reviews = reviews; // data from resolve
    $scope.deleteReview = function (review, index) {
        $scope.editRevbtn = true;
        $scope.delReview = {
            apartmentID: review.apartmentID,
            reviewID: review.reviewID
        };
        $http.post("api/reviews/Delete", $scope.delReview, userProfile.config).then(function (response) {
            if (response.data) {
                $scope.editRevbtn = false;
                $rootScope.userDetails.reviews.splice(index, 1);
            }
            $scope.editRevbtn = false;
        });
    };
    $scope.closeTopBar();
    $scope.editReview = function (review, index) {
        $scope.editRevbtn = true;
        $scope.editedReview = {
            apartmentID: review.apartmentID,
            reviewID: review.reviewID,
            description: $scope.editDescription ? $scope.editDescription : review.description,
            rating: $scope.editRating ? $scope.editRating : review.rating
        };
        if ($scope.editedReview.reviewID < 1 || $scope.editedReview.apartmentID < 1 || $scope.editedReview.rating < 1 || $scope.editedReview.rating > 1 ||
            $scope.editedReview.rating > 5 || $scope.editedReview.description.length < 3 || $scope.editedReview.description.length > 70) {
            $scope.editRevbtn = false;
            return;
        }
        $http.put("api/reviews", $scope.editedReview, userProfile.config).then(function (response) {
            if (response.data) {
                $scope.currentReview = -1;
                $rootScope.userDetails.reviews[index] = $scope.editedReview;
                $scope.editRevbtn = false;
            }
            $scope.editRevbtn = false;
        });
    };

    $scope.editReviewHandler = function (index) {//Change the review view in the ui to see the apartment that being edit
        $scope.currentReview = index;
    };
});