var apartrentApp = angular.module('apartrentApp');

apartrentApp.factory("imageHandlerFactory", function () {

    var handler = this;
    var type;
    var imageString;

    handler.sendImage = function (image) {
        var temp = {};
        if (image[0] === null || image[0] === undefined || typeof (image[0]) === "number")
            return;
        if (typeof (image) === "string") {
            temp = {
                profileImage: image.split("base64,")[1],
                profileImageType: image.split("base64,")[0] + "base64,"
            };
            return temp;
        }
        else {
            temp.apartmentImageType = [];
            temp.apartmentImage = [];
            temp.apartmentImage[0] = image[0].split("base64,")[1];
            temp.apartmentImageType[0] = image[0].split("base64,")[0] + "base64,";
            for (var i = 1; i < 5; i++) {
                if (image[i] === null || image[i] === undefined || typeof (image[i]) === "number") {
                    temp.apartmentImage.push(null);
                    temp.apartmentImageType.push(null);
                    continue;
                }
                temp.apartmentImage.push(image[i].split("base64,")[1]);
                temp.apartmentImageType.push(image[i].split("base64,")[0] + "base64,");
            }
            return temp;
        }

    };

    handler.constructImage = function (imageType, image) {

        if (typeof (image) === "string") {
            imageString = imageType + image;
            return imageString;
        }
        else {
            imageString = [];
            imageString[0] = imageType[0] + image[0];
            for (var i = 1; i < image.length; i++) {
                if (image[i] === null || image[i] === undefined) {
                    imageString.push(null);
                    continue;
                }
                imageString.push(imageType[i] + image[i]);
            }
            return imageString;
        }

    };



    return handler;
});