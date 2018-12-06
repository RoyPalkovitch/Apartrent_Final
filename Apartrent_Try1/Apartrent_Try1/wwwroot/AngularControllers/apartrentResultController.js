
var apartrentResultController = angular.module('apartrentResultController', []);

apartrentResultController.controller("apartrentResultController", function ($scope, $http, $location, $route, searchResultBackend, userProfile, currentApartment, countriesService) {

    var apartmentResult = this;
    apartmentResult.reloadData = function () {
        $route.reload();
    };

    //$scope.$on("getApartmentsData", function () { // the event is catch here and set the data to the controller from apartmentsDataForLocationService
    //    $scope.searchResult = apartmentsDataForLocationService.data;
    //});

    if ($location.path().split('/').length <= 3) {
        $scope.searchResult = searchResultBackend;
    }
    if ($location.path().split('/').length > 3) {

        $scope.currentApartmentData = searchResultBackend;
        userProfile.getData();
    }
    $scope.$on("getUserData", function () {
        $scope.userDetails = userProfile.data;
    });


    $scope.countries = countriesService.data;


    $scope.$on("getCountries", function () {
        $scope.countries = countriesService.data;
    }); 

    $scope.getApartment = function (apartmentID, index) {
        $scope.apartmentDat = {
            apartmentID: apartmentID,
            fromDate: $scope.searchResult[index].fromDate,
            toDate: $scope.searchResult[index].toDate,
            priceForStaying: $scope.searchResult[index].priceForStaying,
            pricePerDay: $scope.searchResult[index].pricePerDay,
            pricePerGuest: $scope.searchResult[index].pricePerGuest

        };
        currentApartment.setData($scope.apartmentDat);
       
    };



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
    $scope.newOrder = function () {
        $scope.order = {
            apartmentID: $scope.currentApartmentData.apartmentID,
            userName: $scope.userDetails.userName,
            renterUserName: $scope.currentApartmentData.renterUserName,
            fromDate: $scope.currentApartmentData.fromDate,
            toDate: $scope.currentApartmentData.toDate
        };

        $http.post("api/orders?password=" + $scope.userDetails.password, $scope.order).then(function (response) {
            if (response.data) {
                $scope.successPurches = true;
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