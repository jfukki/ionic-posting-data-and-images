// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase'])







.controller('post',function($scope,$firebaseArray,$firebaseAuth){
    
    var ref = new Firebase ('https://jfuki-posts.firebaseio.com/');
    $scope.products = $firebaseArray(ref);
   // $scope.users=$firebaseAuth(ref.child('users'));
    

    
    
    $scope.post = function(name,code,des,product_image){
       //name.time = new Date().getTime();
       
      var timestamp = new Date().valueOf();
    //    message.uid = $scope.signedInUser.uid;
      //  message.name = $scope.signedInUser.twitter.username;    
        $scope.products.$add(
            {   
                id: timestamp,
                product_name:name,
                product_code:code,
                product_description:des,
                product_image:product_image
                
              
            }
        );
        code='';
        des='';
        name='';
        product_image='';
    };
    
    function clearFields(name,code,des,product_image){
        
      this.code="";
        this.name="";
        this.des="";
        this.product_image="";
    }


    var syncArray = $firebaseArray(ref.child('images'));
    $scope.images = [];
    $scope.images = syncArray;

    
     $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert('Image has been uploaded');
            });
        }, function(error) {
            alert.error(error);
        });
    }
    
    
    //Removin image
        $scope.removeImage = function(image){
        console.log('Enters the function');
        $scope.images.$remove(image);
      
    console.log('Leaves the function');
  };
    
})




.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

