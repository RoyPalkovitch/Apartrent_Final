var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("dateHandlerFactory", function () {

    var handler = this;

    handler.dateConverter = function (time) {

        if (time[0] === null || time[0] === undefined)
            return;
        if (typeof (time) === "string") {
            return time = time.split("T")[0];
        }
        else {
            for (var i = 0; i < time.length; i++) {
                time[i] = time.split("T")[0];
            }
            return time;
        }

    };

    return handler;
});