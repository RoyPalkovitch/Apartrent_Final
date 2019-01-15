var searchedApartmentReviewsController = angular.module('searchedApartmentReviewsController', []);

searchedApartmentReviewsController.controller('searchedApartmentReviewsController', function ($scope, userProfile, $http, $rootScope) {


    $scope.newRevBtn = false;

    if ($rootScope.userDetails !== "" && $rootScope.userDetails !== undefined) {
        $scope.newReview = function (apartmentID) {
            $scope.newRevBtn = true;

            $scope.review = {
                description: $scope.reviewDescription,
                rating: $scope.reviewRating,
                apartmentID: apartmentID
            };
            if ($scope.review.description.length > 70 || $scope.review.description.length < 3 ||
                $scope.review.rating < 1 || $scope.review.rating > 5 || $scope.review.apartmentID === undefined) {
                $scope.newRevBtn = false;
                return $scope.errorMessage = true;
            }

            $http.post("api/reviews", $scope.review, userProfile.config).then(function (response) {
                $rootScope.reload = true;
                if (response.data && response.data > 0) {
                $scope.newRevBtn = false;
                    $scope.review.reviewID = response.data;
                    $scope.reviewDescription = '';
                    $scope.review.userName = $rootScope.userDetails.userName;
                    $rootScope.reload = false;
                    $rootScope.$broadcast("AddReview", { review: $scope.review }); // all the events catches in viewApartmentController
                }
                $rootScope.reload = false;
                $scope.newRevBtn = false;

            });
        };

        $scope.deleteReview = function (review, index) {
            $scope.delReview = {
                apartmentID: review.apartmentID,
                reviewID: review.reviewID
            };
            $http.post("api/reviews/Delete", $scope.delReview, userProfile.config).then(function (response) {
                $rootScope.reload = true;
                if (response.data) {
                    $rootScope.reload = false;

                    $rootScope.$broadcast("DeleteReview", { delData: index });
                }
            });
        };
        $scope.editRevBtn = false;
        $scope.editReview = function (review, index) {// maybe i will need to add back the user name to the edited review

            $scope.editRevBtn = true;

            $scope.editedReview = {
                apartmentID: review.apartmentID,
                reviewID: review.reviewID,
                description: $scope.editDescription ? $scope.editDescription : review.description,
                rating: $scope.editRating ? $scope.editRating : review.rating
            };
            if ($scope.editedReview.description.length > 70 || $scope.editedReview.description.length < 5 ||
                $scope.editedReview.rating < 1 || $scope.editedReview.rating > 5 || $scope.editedReview.apartmentID === undefined) {
                $scope.editRevBtn = false;
                return;
            }
            $scope.currentReview = -1;
            $http.put("api/reviews", $scope.editedReview, userProfile.config).then(function (response) {
                $scope.editRevBtn = false;
                $rootScope.reload = true;
                if (response.data) {
                    $scope.editedReview.userName = $rootScope.userDetails.userName;
                    $rootScope.reload = false;
                    $rootScope.$broadcast("EditReview", { reviewIndex: index, reviewData: $scope.editedReview });
                }
            });
            $scope.editRevBtn = false;
        };
        $scope.editReviewHandler = function (index) {//Change the review view in the ui to see the apartment that being edit
            $scope.currentReview = index;
            $rootScope.noEditReview = !$rootScope.noEditReview;
        };
    }

});