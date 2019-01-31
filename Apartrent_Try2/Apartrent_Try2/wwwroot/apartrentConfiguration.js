var apartrentApp = angular.module('apartrentApp', ['ui.router','registerController', 'loginController', 'searchController', 'searchResultController', 'indexController',
    'viewApartmentController', 'placeOrdersController', 'searchedApartmentReviewsController', 'editAccountController', 'profileController',
    'userOrdersController', 'userReviewsController', 'pendingOrdersController', 'userApartmentsController', 'editApartmentController',
    'addApartmentController', 'currentUserApartmentViewController']);

apartrentApp.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state("root",
            {
                url: "/index.html",
                redirectTo: "index",
                resolve: {
                    promiseData: function (startupResolve) {
                        return startupResolve.getData();
                    }
                }
        })
        .state("34.73.45.1",
            {
                url: "/index.html",
                redirectTo: "index",
                resolve: {
                    promiseData: function (startupResolve) {
                        return startupResolve.getData();
                    }
                }
            })
        .state("/index",
            {
                url: "/index/",
                redirectTo: "index"
            })
        .state("index", {
            url: "/index",
            templateUrl: "home.html",
            controller: "searchController",
            resolve: {
                promiseData: function (startupResolve) {
                    return startupResolve.getData();
                }
            }
        })

        .state("home", {
            url: "/home",
            templateUrl: "home.html",
            controller: "searchController",
            resolve: {
                promiseData: function (startupResolve) {
                    return startupResolve.getData();
                }
            }
        })

        .state("Register", {
            url: "/Register",
            templateUrl: "UserBar/Template/register.html",
            controller: "registerController",
            resolve: {
                data: function ($q) {
                    return $q.when();
                }
            }
        })

        .state("Login", {
            url: "/Login",
            templateUrl: "UserBar/Template/Login.html",
            controller: "loginController"
        })

        .state("ProfileParent", {
            url: "",
            templateUrl: "UserProfile/Profile/Template/ProfileParent.html",
            controller: "profileController",
            abstract: true
        })

        .state("ProfileParent.Profile", {
            url: "/Profile/userName=:userName",
            templateUrl: "UserProfile/Profile/Template/Profile.html",
            controller: "profileController"
        })

        .state("ProfileParent.EditAccount", {
            url: "/Profile/EditAccount/userName=:userName",
            templateUrl: "UserProfile/Profile/Template/EditAccount.html",
            controller: "editAccountController"
        })

        .state("ProfileParent.UserOrders", {
            url: "/Profile/UserOrders/userName=:userName",
            templateUrl: "UserProfile/Profile/Template/UserOrders.html",
            controller: "userOrdersController",
            resolve: {
                orders: function ($http, userProfile, dateHandlerFactory) {
                    return $http.get("api/orders/UserOrders", userProfile.config).then(function (response) {
                        if (response.data) {
                            for (var i = 0; i < response.data.length; i++) {
                                response.data[i].fromDate = dateHandlerFactory.dateConverter(response.data[i].fromDate);
                                response.data[i].toDate = dateHandlerFactory.dateConverter(response.data[i].toDate);
                                response.data[i].orderDate = dateHandlerFactory.dateConverter(response.data[i].orderDate);
                            }
                            return response.data;
                        }
                    });
                }
            }
        })

        .state("ProfileParent.UserReviews", {
            url: "/Profile/UserReviews/userName=:userName",
            templateUrl: "UserProfile/Profile/Template/UserReviews.html",
            controller: "userReviewsController",
            resolve: {
                reviews: function ($http, userProfile) {
                    return $http.get("api/reviews/UserReviews", userProfile.config).then(function (response) {
                        if (response.data) {
                            return response.data;
                        }
                    });
                }
            }
        })

        .state("ProfileParent.UserApartments", {
            url: "/Profile/UserApartments/userName=:userName",
            templateUrl: "UserProfile/RenterFeatures/Template/UserApartments.html",
            controller: "userApartmentsController"
        })

        .state("ProfileParent.EditApartment", {
            url: "/Profile/UserApartments/EditApartment/userName=:userName/apartmentIndex=:apartmentIndex",
            templateUrl: "UserProfile/RenterFeatures/Template/EditApartment.html",
            controller: "editApartmentController"
        })

        .state("ProfileParent.AddApartment", {
            url: "/Profile/UserApartment/AddApartment/userName=:userName",
            templateUrl: "UserProfile/RenterFeatures/Template/AddApartment.html",
            controller: "addApartmentController"
        })

        .state("ProfileParent.CurrentUserApartmentView", {
            url: "/Profile/UserApartments/CurrentUserApartmentView/userName=:userName/apartmentID=:apartmentID",
            templateUrl: "UserProfile/RenterFeatures/Template/CurrentUserApartmentView.html",
            controller: "currentUserApartmentViewController",
            resolve: {
                currentApartment: function ($transition$, apartmentsFactory) {
                    return apartmentsFactory.currentApartmentData($transition$.params());
                }
            }
        })

        .state("SearchResult", {
            url: "/SearchResult/countryID=:countryID/fromDate=:fromDate/toDate=:toDate/guests=:guests",
            templateUrl: "SearchResult/Template/searchResult.html",
            controller: "searchResultController",
            resolve: {
                apartmentsData: function (apartmentsFactory, $transition$) {
                    return apartmentsFactory.getApartments($transition$.params());
                }
            }
        })

        .state("ApartmentView", {
            url: "/SearchResult/ViewApartment/apartmentID=:apartmentID/fromDate=:fromDate/toDate=:toDate/guests=:guests",
            templateUrl: "SearchResult/Template/ViewApartment.html",
            controller: "viewApartmentController",
            resolve: {
                apartmentData: function (apartmentsFactory, $transition$) {
                    return apartmentsFactory.currentApartmentData($transition$.params());
                }
            }
        });

    $urlRouterProvider.otherwise("/index.html");
    $locationProvider.html5Mode(true);

});