var viewApartment = angular.module('viewApartmentController', []);

viewApartment.controller('viewApartmentController', function ($scope, $rootScope, $window, apartmentData) {

    if ($window.localStorage.getItem("userProfile"))
        $rootScope.userDetails = JSON.parse($window.localStorage.getItem("userProfile"));
    if ($scope.currentApartmentData === undefined)
        $scope.currentApartmentData = apartmentData;

    $scope.$on("AddReview", function (event, args) {
        $scope.currentApartmentData.reviews.push(args.review);
    });

    $scope.$on("DeleteReview", function (event, args) {
        $scope.currentApartmentData.reviews.splice(args.index, 1);
    });

    $scope.$on("EditReview", function (event, args) {
        $scope.currentApartmentData.reviews[args.reviewIndex] = args.reviewData;
    });

});