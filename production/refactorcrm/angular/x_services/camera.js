'use strict';
myAppModule.service('CameraService',function()
{
    var GetCameraOption = function()
    {
        var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 500,
                targetHeight: 500,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false,
                correctOrientation:true
              };
        return options;
    }
   return {
        GetCameraOption:GetCameraOption
   }
});