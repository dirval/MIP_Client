var app = angular.module('starter.controllers', []);

app.controller('loginCtrl', function($scope, $state){
  $scope.name = 'Login page';

  $scope.goToMain = function(){
    $state.go('main');
  }
});

app.controller('mainCtrl', function($scope, $state, commentData, likeData){

  $scope.addLike = function(id_photo){

    console.log(likeData.getLikes(id_photo).like);
    if (likeData.getLikes(id_photo).havelike == true) {
      likeData.removeLike(id_photo);
    }
    else {
      $scope.haveLike = true;
      likeData.addLike(id_photo);
    }
  }

  $scope.nbLikes = function(id_photo){
    return likeData.getLikes(id_photo).like;
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

  $scope.goToComment = function(id){
    $state.go('comment', {id: id});
  }

});

app.controller('searchCtrl', function($scope, $state){
  $scope.name='search Page!';

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

app.controller('addCtrl', function($scope, $state){
  $scope.name='add Page!';

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

app.controller('likeCtrl', function($scope, $state){
  $scope.name='like Page!';

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

app.controller('profileCtrl', function($scope, $state){
  $scope.name='profile Page!';

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

app.controller('commentCtrl', function($scope,$state, $stateParams, commentData){
  $scope.name="comment page!";
  var id_photo = $stateParams.id;
  $scope.comms = commentData.getComments(id_photo);

  $scope.addComment = function(settings){
    commentData.addComment(id_photo, settings.comment);
  }
  console.log($scope.comms);

  $scope.goToMain = function(){
    $state.go('main');
  }
});

app.factory('commentData', [function(){
  var commentStorage = [
    [{text: 'test'}]
  ];

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

app.factory('likeData', [function(){
  var likeStorage = [
    {like: 0, havelike: false}
  ];

  return{
    addLike: function(id_post){
      console.log("add like");
      console.log(likeStorage[id_post]);
      likeStorage[id_post].like++;
      likeStorage[id_post].havelike = true;
    },
    removeLike: function(id_post){
      console.log("remove like");
      likeStorage[id_post].like--;
      likeStorage[id_post].havelike = false;
    },
    getLikes: function(id_post){
      // console.log("get likes");
      if (likeStorage[id_post] == undefined) {
        likeStorage[id_post] = {like: 0, havelike: false};
      }
      return likeStorage[id_post];
    }
  };
}]);

app.controller('signupCtrl', function($scope, $state){
  $scope.name="signup Page!"

  $scope.goToLogin = function(){
    $state.go('login');
  }
});
