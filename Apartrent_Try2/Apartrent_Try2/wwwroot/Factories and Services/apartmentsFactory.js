var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("apartmentsFactory", function ($http, $q, $window, $location) {
    var apartments = {};
    var countries = JSON.parse($window.sessionStorage.getItem("countriesData"));
    apartments.getApartments = function (searchParams) {
        if (searchParams.countryID && searchParams.guests && searchParams.fromDate && searchParams.toDate) {
            return $http.get('api/apartment/ApartmentLocation?countryID=' + searchParams.countryID + '&numberOfGuests=' + searchParams.guests + '&fromDate=' + searchParams.fromDate + '&toDate=' + searchParams.toDate).then(function (response) {
                if (response.data) {
                    return response.data;
                } else {
                    return $q.when();
                }
            });
        }
        else {
            return $q.when();
        }

    };

    apartments.lastSearchParams = function (data) {
        $window.sessionStorage.setItem("LastSearch", JSON.stringify(data));
        apartments.numberOfGuests = data.numberOfGuests;
        apartments.fromDate = data.fromDate;
        apartments.toDate = data.toDate;
        apartments.countryName = countries[data.countryID - 1].countryName;
        apartments.pricePerGuest = data.pricePerGuest;
        apartments.priceForStaying = data.priceForStaying;
    };

    apartments.currentApartmentData = function (searchParams) {
        return $http.get("api/apartment/GetApartment?apartmentID=" + searchParams.apartmentID).then(function (response) {
            if (response.data) {
                response.data.countryName = countries[response.data.countryID - 1].countryName;
                if ($location.path().includes("SearchResult/")) {
                    var temp = JSON.parse($window.sessionStorage.getItem("LastSearch"));
                    if (temp.apartmentID !== searchParams.apartmentID) {
                        temp.apartmentID = searchParams.apartmentID;
                        response.data.fromDate = apartments.fromDate;
                        response.data.toDate = apartments.toDate;
                        response.data.numberOfGuests = apartments.numberOfGuests;
                        response.data.pricePerGuest = apartments.pricePerGuest;
                        response.data.priceForStaying = apartments.priceForStaying;
                        $window.sessionStorage.setItem("LastSearch", JSON.stringify(temp));
                    }
                    else if (temp.apartmentID === searchParams.apartmentID || (!apartments.pricePerGuest || !apartments.priceForStaying)) {
                        response.data.fromDate = temp.fromDate;
                        response.data.toDate = temp.toDate;
                        response.data.numberOfGuests = temp.numberOfGuests;
                        response.data.pricePerGuest = temp.pricePerGuest;
                        response.data.priceForStaying = temp.priceForStaying;
                    }
                }

                return response.data;
            } else {
                return $location.url('/Pagenotfound');

            }

        });
    };

    return apartments;
});