var app = angular.module('starter.controllers', []);

app.controller('loginCtrl', function($scope, $state){
  $scope.name = 'Login page';

  $scope.goToMain = function(){
    $state.go('main');
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ mainCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('mainCtrl', function($scope, $state, commentData, likeData, photoData){

  $scope.likes = [];
  $scope.posts =  photoData.getPhoto();

  $scope.init = function(){
    for (var i = 0; i < $scope.posts.length; i++) {
      $scope.likes[i] = likeData.getLike(i).havelike;
      // console.log($scope.likePhoto);
      // console.log($scope.likes[i]);
    }
  }

  $scope.addLike = function(id_photo){
    // console.log(likeData.getLikes(id_photo).like);
    if (likeData.getLike(id_photo).havelike == true) {
      likeData.removeLike(id_photo);
      $scope.likes[id_photo] = likeData.getLike(id_photo).havelike;
      console.log(id_photo);
      console.log($scope.likes[id_photo]);
    }
    else {
      likeData.addLike(id_photo);
      $scope.likes[id_photo] = likeData.getLike(id_photo).havelike;
      console.log(id_photo);
      console.log($scope.likes[id_photo]);
    }
  }

  $scope.nbLikes = function(id_photo){
    return likeData.getLike(id_photo).like;
  }

  $scope.nbcomment = function(id_photo){
    return commentData.getComments(id_photo);
  }

  $scope.goToSearch = function(){
    $state.go('search');
  }

  $scope.goToAdd = function(){
    $state.go('add');
  }

  $scope.goToLike = function(){
    $state.go('like');
  }

  $scope.goToProfile = function(){
    $state.go('profile');
  }

  $scope.goToComment = function(id, page){
    $state.go('comment', {id: id, page: page});
  }

});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ searchCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('searchCtrl', function($scope, $state, $ionicPlatform, $cordovaCamera, photoData){

  $scope.images = photoData.getPhoto();
  console.log($scope.images);

  $scope.goToMain = function(){
    $state.go('main');
  }

  $scope.goToAdd = function(){
    $state.go('add');
  }

  $scope.goToLike = function(){
    $state.go('like');
  }

  $scope.goToProfile = function(){
    $state.go('profile');
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ addCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('addCtrl', function($scope, $state, $ionicPlatform, $cordovaCamera, photoData){
  $scope.name='add Page!';


  $scope.takePhoto = function()
  {
      var options =  {
          quality: 80,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          saveToPhotoAlbum: true,
          mediaType: Camera.MediaType.PICTURE
      };

      $ionicPlatform.ready(function() {
          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.picture = imageData;
              console.log($scope.picture);

          }, function(err) {
                console.log("ERROR! Don't get photo from camera");
          });
      });
  }

  $scope.saveImage = function(settings){
    // console.log(settings.description);
    var beforePush = photoData.getPhoto().length;
    // console.log(beforePush);
    photoData.addPhoto($scope.picture, settings.description);
    if (photoData.getPhoto().length != beforePush) {
      $scope.show = 'success';
      $scope.result = 'Succes to upload photo!';
      console.log($scope.result);
    }
    else {
      $scope.show = 'error';
      $scope.result = "Something Wrong!";
    }
  }

  $scope.photoFromPhone = function()
  {
      var options =  {
          quality: 80,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          mediaType: Camera.MediaType.PICTURE
      };

      $ionicPlatform.ready(function() {
          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.picture = imageData;
          }, function(err) {
                console.log("ERROR! Don't get photo from phone");
          });
      });
  }

  $scope.goToSearch = function(){
    $state.go('search');
  }

  $scope.goToMain = function(){
    $state.go('main');
  }

  $scope.goToLike = function(){
    $state.go('like');
  }

  $scope.goToProfile = function(){
    $state.go('profile');
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ likeCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('likeCtrl', function($scope, $state, commentData, likeData, photoData){

  $scope.likes = [];
  $scope.myPosts = photoData.getPhoto();

  $scope.init = function(){
    for (var i = 0; i < $scope.myPosts.length; i++) {
      $scope.likes[i] = likeData.getLike(i).havelike;
      // console.log($scope.likePhoto);
      // console.log($scope.likes[i]);
    }
  }

  $scope.addLike = function(id_photo){
    // console.log(likeData.getLikes(id_photo).like);
    if (likeData.getLike(id_photo).havelike == true) {
      likeData.removeLike(id_photo);
      $scope.likes[id_photo] = likeData.getLike(id_photo).havelike;
      console.log(id_photo);
      console.log($scope.likes[id_photo]);
    }
    else {
      likeData.addLike(id_photo);
      $scope.likes[id_photo] = likeData.getLike(id_photo).havelike;
      console.log(id_photo);
      console.log($scope.likes[id_photo]);
    }
  }

  $scope.likePhoto = function(id_photo){
    return likeData.getLike(id_photo).havelike;
  }

  $scope.goToComment = function(id, page){
    $state.go('comment', {id: id, page: page});
  }

  $scope.nbLikes = function(id_photo){
    return likeData.getLike(id_photo).like;
  }

  $scope.nbcomment = function(id_photo){
    return commentData.getComments(id_photo);
  }


  $scope.goToSearch = function(){
    $state.go('search');
  }

  $scope.goToMain = function(){
    $state.go('main');
  }

  $scope.goToAdd = function(){
    $state.go('add');
  }

  $scope.goToProfile = function(){
    $state.go('profile');
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ profileCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('profileCtrl', function($scope, $state, $ionicPlatform, $cordovaCamera, photoData, likeData, commentData){

  $scope.likes = [];
  $scope.myPosts = photoData.getPhoto();

  $scope.init = function(){
    for (var i = 0; i < $scope.myPosts.length; i++) {
      $scope.likes[i] = likeData.getLike(i).havelike;
      // console.log(photoData.getPhoto()[i].name);
      if (photoData.getPhoto()[i].name == 'Rambo') {
        $scope.imgProfile = photoData.getPhoto()[i].imgProfile;
      }
      else {
        console.log('doesn t work!');
      }
      // console.log($scope.likePhoto);
      // console.log($scope.likes[i]);
    }
  }

  $scope.photoFromPhone = function()
  {
      var options =  {
          quality: 80,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          mediaType: Camera.MediaType.PICTURE
      };

      $ionicPlatform.ready(function() {
          $cordovaCamera.getPicture(options).then(function(imageData) {
              $scope.picture = imageData;
              $scope.update();
          }, function(err) {
                console.log("ERROR! Don't get photo from phone");
          });
      });


  }

  $scope.update = function(){
    photoData.updateProfile($scope.picture);
  }

  $scope.addLike = function(id_photo){
    // console.log(likeData.getLikes(id_photo).like);
    if (likeData.getLike(id_photo).havelike == true) {
      likeData.removeLike(id_photo);
      $scope.likes[id_photo] = likeData.getLike(id_photo).havelike;
      console.log(id_photo);
      console.log($scope.likes[id_photo]);
    }
    else {
      likeData.addLike(id_photo);
      $scope.likes[id_photo] = likeData.getLike(id_photo).havelike;
      console.log(id_photo);
      console.log($scope.likes[id_photo]);
    }
  }


  $scope.goToComment = function(id, page){
    $state.go('comment', {id: id, page: page});
  }

  $scope.nbLikes = function(id_photo){
    return likeData.getLike(id_photo).like;
  }

  $scope.nbcomment = function(id_photo){
    return commentData.getComments(id_photo);
  }

  $scope.goToSearch = function(){
    $state.go('search');
  }

  $scope.goToMain = function(){
    $state.go('main');
  }

  $scope.goToAdd = function(){
    $state.go('add');
  }

  $scope.goToLike = function(){
    $state.go('like');
  }

  $scope.goToLogin = function(){
    $state.go('login');
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ commentCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('commentCtrl', function($scope,$state, $stateParams, commentData){
  $scope.name="comment page!";
  var id_photo = $stateParams.id;
  $scope.page = $stateParams.page;
  console.log($scope.page);
  $scope.comms = commentData.getComments(id_photo);

  $scope.addComment = function(settings){
    commentData.addComment(id_photo, settings.comment);
  }
  console.log($scope.comms);

  $scope.goToPreviousPage = function(){
    console.log($scope.page);
    $state.go($scope.page);
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~ factory commentData ~~~~~~~~~~~~~~~~~~~~~~~

app.factory('commentData', [function(){
  var commentStorage = [];

  return{
    addComment: function(id_post,text_com){
      // console.log("add comment");
      commentStorage[id_post].push({
        text:text_com
      });
    },
    getComments: function(id_post){
      // console.log("get comment");
      if (commentStorage[id_post] == undefined) {
        commentStorage[id_post] = [];
      }
      return commentStorage[id_post];
    }
  };
}]);

// ~~~~~~~~~~~~~~~~~~~~~~ factory likeData ~~~~~~~~~~~~~~~~~~~~~~~~~

app.factory('likeData', [function(){
  var likeStorage = [];

  return{
    addLike: function(id_post){
      // console.log("add like");
      likeStorage[id_post].like++;
      likeStorage[id_post].havelike = true;
      // console.log(likeStorage[id_post]);
    },
    removeLike: function(id_post){
      // console.log("remove like");
      likeStorage[id_post].like--;
      likeStorage[id_post].havelike = false;
      // console.log(likeStorage[id_post]);
    },
    getLike: function(id_post){
      if (likeStorage[id_post] == undefined) {
        likeStorage[id_post] = {like: 0, havelike: false};
      }
      return likeStorage[id_post];
    }
  };
}]);

// ~~~~~~~~~~~~~~~~~~~~~~~ factory photoData ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.factory('photoData', [function(){
  var photoStorage = [
    {id: 0, src: "img/back_the_future.jpeg", description: "Is it a our new poster!", imgProfile: "img/marty.jpeg", name:"Marty McFly"},
    {id: 1, src:'img/bat_mobile.jpeg', description: "I buy a new car!",imgProfile: "img/batman.jpeg", name: "Batman" }
  ];

  return{
    addPhoto: function(uri, descri){
      photoStorage.push({
        id: photoStorage.length , src: uri, description: descri, imgProfile: "img/rambo.jpeg", name: "Rambo"
      });
      console.log(uri);
      console.log(photoStorage);
    },
    getPhoto: function(){
      console.log(photoStorage.length);
      return photoStorage;
    },
    updateProfile: function(uri){
      for (var i = 0; i < photoStorage.length; i++) {
        if (photoStorage[i].name == 'Rambo') {
          photoStorage[i].imgProfile = uri;
        }
      }
      console.log(uri);
    }
  };
}]);

// ~~~~~~~~~~~~~~~~~~~~~~ signupCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('signupCtrl', function($scope, $state){
  $scope.name="signup Page!"

  $scope.goToLogin = function(){
    $state.go('login');
  }
});
