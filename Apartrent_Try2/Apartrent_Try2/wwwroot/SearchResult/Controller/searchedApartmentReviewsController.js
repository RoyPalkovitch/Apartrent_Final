var searchedApartmentReviewsController = angular.module('searchedApartmentReviewsController', []);

searchedApartmentReviewsController.controller('searchedApartmentReviewsController', function ($scope, userProfile, $http, $rootScope) {
    if ($rootScope.userDetails !== "" && $rootScope.userDetails !== undefined){
        $scope.newReview = function (apartmentID) {
            $scope.review = {
                description: $scope.reviewDescription,
                rating: $scope.reviewRating,
                apartmentID: apartmentID
            };
            $http.post("api/reviews", $scope.review, userProfile.config).then(function (response) {
                if (response.data && response.data > 0) {
                    $scope.review.reviewID = response.data;
                    $scope.reviewDescription = '';
                    $scope.review.userName = $rootScope.userDetails.userName;
                    $rootScope.$broadcast("AddReview", { review: $scope.review }); // all the events catches in viewApartmentController
                }

            });
        };

        $scope.deleteReview = function (review, index) {
            $scope.delReview = {
                apartmentID: review.apartmentID,
                reviewID: review.reviewID
            };
            $http.post("api/reviews/Delete", $scope.delReview, userProfile.config).then(function (response) {
                if (response.data) {
                    $rootScope.$broadcast("DeleteReview", { delData: index });
                }
            });
        };

        $scope.editReview = function (review, index) {// maybe i will need to add back the user name to the edited review
            $scope.editedReview = {
                apartmentID: review.apartmentID,
                reviewID: review.reviewID,
                description: $scope.editDescription ? $scope.editDescription : review.description,
                rating: $scope.editRating ? $scope.editRating : review.rating
            };
            $scope.currentReview = -1;
            $http.put("api/reviews", $scope.editedReview, userProfile.config).then(function (response) {
                if (response.data) {
                    $scope.editedReview.userName = $rootScope.userDetails.userName;
                    $rootScope.$broadcast("EditReview", { reviewIndex: index, reviewData: $scope.editedReview });
                }
            });
        };

        $scope.editReviewHandler = function (index) {//Change the review view in the ui to see the apartment that being edit
            $scope.currentReview = index;
            $scope.noEditReview = true;
        };
    }

});