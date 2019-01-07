var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("apartmentsFactory", function ($http, $q, $window, $location, $rootScope, imageHandlerFactory, dateHandlerFactory) {
    var apartments = {};
    var countries = JSON.parse($window.sessionStorage.getItem("countriesData"));
    apartments.getApartments = function (searchParams) {
        if (searchParams.countryID && searchParams.guests && searchParams.fromDate && searchParams.toDate) {
                $rootScope.reload = true;
            return $http.get('api/apartment/ApartmentLocation?countryID=' + searchParams.countryID + '&numberOfGuests=' + searchParams.guests + '&fromDate=' + searchParams.fromDate + '&toDate=' + searchParams.toDate).then(function (response) {
                $rootScope.reload = false;

                if (response.data) {
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].apartmentImage = imageHandlerFactory.constructImage(response.data[i].apartmentImageType[0], response.data[i].apartmentImage[0]);
                        
                    }
                    return response.data;
                } else {
                    return $q.when();
                }
            });
        }
        else {
            $rootScope.reload = false;

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
            $rootScope.reload = true;
        return $http.get("api/apartment/GetApartment?apartmentID=" + searchParams.apartmentID).then(function (response) {
            if (response.data) {
                response.data.countryName = countries[response.data.countryID - 1].countryName;
                response.data.apartmentImage = imageHandlerFactory.constructImage(response.data.apartmentImageType, response.data.apartmentImageByte);

                if ($location.path().includes("SearchResult/")) {
                    var temp = JSON.parse($window.sessionStorage.getItem("LastSearch"));
                    if (temp.apartmentID !== searchParams.apartmentID) {
                        temp.apartmentID = searchParams.apartmentID;
                        response.data.fromDate = dateHandlerFactory.dateConverter(apartments.fromDate);
                        response.data.toDate = dateHandlerFactory.dateConverter(apartments.toDate);
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
                } else {
                    response.data.fromDate = dateHandlerFactory.dateConverter(response.data.fromDate);
                    response.data.toDate = dateHandlerFactory.dateConverter(response.data.toDate);
                }
                $rootScope.reload = false;

                return response.data;
            } else {
                return $location.url('/Pagenotfound');

            }

        });
    };

    return apartments;
});