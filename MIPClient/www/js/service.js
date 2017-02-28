var app = angular.module('starter.services', ['config']);

app.factory('User', function($q, $http, API_ENDPOINT){
  var user = null;

  return{
    login: function(username, password){
      return $q(function(resolve, reject){
        $http.post(API_ENDPOINT.url + "login", {username: username, password: password}).then(function(result){
          if (result.status == 200) {
            user = { id: result.data.id, username: result.data.username};
            console.log(user);
            resolve();
          }
          else {
            reject();
          }
        }).catch(function(){
          reject();
        });
      });
    },
    isLogged: function()
    {
      return $q(function(resolve, reject){
        if (user != null) {
          resolve();
        }
        else {
          reject();
        }
      });
    },
    register: function(username, password, email){
      return $q(function(resolve, reject){
        $http.post(API_ENDPOINT.url + "register", {username: username, password: password, email: email}).then(function(result){
          if (result.status == 200) {
            console.log(result);
            resolve(result);
          }
          else {
            reject();
          }
        }).catch(function(){
          reject();
        });
      });
    },
    getMyInfo: function(){
      return $q(function(resolve, reject){
        $http.get(API_ENDPOINT.url + 'users/' + user.id).then(function(result){
          //console.log(result.data[user.id]);
          console.log(result.data);
          resolve(result.data);
        });
      });
    },
    searchUser: function(searchWord) {
      console.log(searchWord);
      return $q(function(resolve, reject){
        $http.get(API_ENDPOINT.url + 'searchUser/' + searchWord).then(function(match){
          console.log(match);
          resolve(match);
        });
      });
    },
    getUserPost: function(id_user){
      return $q(function(resolve, reject){
        $http.get(API_ENDPOINT.url + 'postUser/' + id_user).then(function(result){
          resolve(result.data);
        });
      });
    }
  };
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

app.factory('photoData',function($q, $http, API_ENDPOINT){

  return{
    addPost: function(descri, user_id){
      return $q(function(resolve, reject){
        console.log(user_id);
        console.log(descri);
        $http.post(API_ENDPOINT.url + 'upload', {id_user: user_id, description: descri}).then(function(result){
          console.log(result.data);
          resolve();
        });
      });
    },
    getPost: function(){
      return $q(function(resolve, reject){
        $http.get(API_ENDPOINT.url + 'posts').then(function(postdata){
          console.log(postdata.data);
          resolve(postdata.data);
        });
      });
    },
    getMypost: function(id_user){
      return $q(function(resolve, reject){
        $http.post(API_ENDPOINT.url + 'myPost/' + id_user).then(function(postdata){
          console.log(postdata);
          resolve(postdata.data);
        });
      });
    }
  };
});
