var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("startupResolve", function (countriesService, categoriesFactory,$window,$q,$http,$rootScope) {

    var data = {};

    data.getData = function () {
        if ($window.sessionStorage.getItem('countriesData') && $window.sessionStorage.getItem("categories")){
            return $q.when();
        }
        else {
            return $http.get('api/countries').then(function (response) {
                $rootScope.reload = true;
                if (response.data) {
                    $window.sessionStorage.setItem('countriesData', JSON.stringify(response.data));
                return $http.get("api/apartment/ApartmentType").then(function (response) {
                    if (response.data) {
                        $window.sessionStorage.setItem('categoriesData', JSON.stringify(response.data));
                        $rootScope.reload = false;
                        return response;
                    }
                });
            }

        });
        }
    };
    return data;
});