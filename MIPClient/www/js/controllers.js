var app = angular.module('starter.controllers', []);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~ Login controller ~~~~~~~~~~~~~~~~~~~~~~~~~~
app.controller('loginCtrl', function($scope, $state, User, $ionicPopup, $ionicHistory){

  $scope.user = {
    name: "",
    password: ""
  };

  $scope.login = function(){
    User.login($scope.user.name, $scope.user.password).then(function(response){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('main');
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: "login fail",
        template: 'Incorrect username or password'
      });
    });
  }

  $scope.goToMain = function(){
    $state.go('main');
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~ signupCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('signupCtrl', function($scope, $state, User, $ionicPopup){
  $scope.name="signup Page!"

  $scope.user = {
    username: "",
    password: "",
    email: ""
  }

  $scope.register = function(){
    User.register($scope.user.username, $scope.user.password, $scope.user.email).then(function(){
      console.log('a voir');
      var alertPopup = $ionicPopup.alert({
        title: 'Register Success',
        template: 'Your are now register, thank you :)'
      })
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: "register fail",
        template: 'there are a problem!'
      });
    });
  }


  $scope.goToLogin = function(){
    $state.go('login');
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ mainCtrl ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.controller('mainCtrl', function($scope, $state, commentData, likeData, photoData, $http, User, API_ENDPOINT){

  photoData.getPost().then(function(postData){
    var x = 0;
    for (var i = 0; i < postData.length; i++) {
      User.getUserPost(postData[i].id_user).then(function(userPost){
        //console.log(userPost);
        postData[x].user = userPost;
        //console.log(postData[x]);
        x ++;
      });

    }
    $scope.postData = postData;
  });

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

app.controller('searchCtrl', function($scope, $state, $ionicPlatform, User, $cordovaCamera, photoData){

  $scope.tabs = {
        people: true,
        tags: false
    };

    $scope.input = {
        searchText: ""
    };

    $scope.searchResults = {
        people: [],
        tags: []
    };

    $scope.emptySearch = function()
    {
        $scope.input.searchText = "";
    };

  $scope.tabActivate = function(tab)
    {
        for (var k in $scope.tabs) {
            if ($scope.tabs.hasOwnProperty(k))
            {
                $scope.tabs[k] = false;
            }
        }
        $scope.tabs[tab] = true;
    };

    $scope.updateSearch = function()
    {
        if($scope.tabs.people == true)
        {
            User.searchUser($scope.input.searchText).then(function(result) {
                $scope.searchResults.people = result.data;
                console.log(result.data);
            });
        }
        else // search for posts with tags
        {

        }
    };

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

app.controller('addCtrl', function($scope, $state, $ionicPlatform, $cordovaCamera, photoData, User, $cordovaFileTransfer){
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

  $scope.saveImage = function(){
    var options = new FileUploadOptions();
            options.fileKey = "image";

            $cordovaFileTransfer.upload('https://afternoon-cliffs-12728.herokuapp.com/upload', $scope.picture, options).then(function(result) {
                console.log("File upload complete");
                console.log(result);
                $scope.uploadResults = "Upload completed successfully"
            }, function(err) {
                console.log("File upload error");
                console.log(err);
                $scope.uploadResults = "Upload failed"
            }, function (progress) {
                // constant progress updates
                console.log(progress);
            });
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
//  $scope.myPosts = photoData.getPhoto();

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

app.controller('profileCtrl', function($scope, $state, $ionicPlatform, $cordovaCamera, photoData, likeData, commentData, User){

  User.getMyInfo().then(function(userdata){
    $scope.userdata = userdata;
    //console.log($scope.userdata);
  });
  $scope.likes = [];

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
