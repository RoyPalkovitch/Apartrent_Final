var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("AuthService", function ($rootScope, $window) {


    function authInterceptor() {

        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage.getItem('UserToken')) {
                    config.headers.Authorization = 'Bearer' +
                        JSON.parse($window.localStorage.getItem('UserToken'));
                }
                return config;
            }
        };

    }

});