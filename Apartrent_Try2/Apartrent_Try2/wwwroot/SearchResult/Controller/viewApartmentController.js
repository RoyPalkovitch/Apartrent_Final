﻿var viewApartment = angular.module('viewApartmentController', []);

viewApartment.controller('viewApartmentController', function ($scope, $rootScope, apartmentData) {

    if ($rootScope.userDetails !== "" && $rootScope.userDetails !== undefined) {

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
    }
});