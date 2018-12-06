var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("apartmentsFactory", function ($http, $q, $window, $location) {
    var apartments = {};
    var countries = JSON.parse($window.sessionStorage.getItem("countriesData"));
    var lastViewedData = {};
    apartments.getApartments = function (searchParams) {
        if (searchParams.countryID && searchParams.guests && searchParams.fromDate && searchParams.toDate) {
            return $http.get('api/apartment/ApartmentLocation?countryID=' + searchParams.countryID + '&numberOfGuests=' + searchParams.guests + '&fromDate=' + searchParams.fromDate + '&toDate=' + searchParams.toDate).then(function (response) {
                if (response.data) {
                    return response.data;
                }
            });
        }
        else {
            return $q.when();
        }

    };

    apartments.lastSearchParams = function (data) {

        apartments.numberOfGuests = data.numberOfGuests;
        apartments.fromDate = data.fromDate;
        apartments.toDate = data.toDate;
        apartments.countryName = countries[data.countryID - 1].countryName;
        apartments.pricePerGuest = data.pricePerGuest;
        apartments.priceForStaying = data.priceForStaying;
    };

    apartments.currentApartmentData = function (searchParams) {
        if ($window.sessionStorage.getItem("lastViewedData"))
            lastViewedData = JSON.parse($window.sessionStorage.getItem("lastViewedData"));

        if (searchParams.apartmentID !== lastViewedData.apartmentID && (searchParams.fromDate !== lastViewedData.fromDate || searchParams.fromDate === undefined && lastViewedData.fromDate === undefined)) {
            return $http.get("api/apartment/GetApartment?apartmentID=" + searchParams.apartmentID).then(function (response) {
                if (response.data) {
                    response.data.countryName = countries[response.data.countryID - 1].countryName;
                    response.data.fromDate ? apartments.fromDate : response.data.fromDate;
                    response.data.toDate ? apartments.toDate : response.data.toDate;
                    response.data.numberOfGuests ? apartments.numberOfGuests : response.data.numberOfGuests;
                    response.data.pricePerGuest ? apartments.pricePerGuest : response.data.pricePerGuest;
                    response.data.priceForStaying ? apartments.priceForStaying : response.data.fromDate.priceForStaying;
                    if ($location.path().includes("SearchResult/"))
                        $window.sessionStorage.setItem("lastViewedData", JSON.stringify(response.data));
                    return response.data;
                } else {
                    return $location.url('/Pagenotfound');
                }

            });
        } else {
            return lastViewedData;
        }
    };

    return apartments;
});