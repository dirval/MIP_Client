// Ionic Starter App
angular.module('config', []).constant('API_ENDPOINT', {
  url: 'https://afternoon-cliffs-12728.herokuapp.com/'
  //https://afternoon-cliffs-12728.herokuapp.com/
});
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ion-gallery', 'starter.services']);

app.run(function($ionicPlatform, $rootScope, User, $state) {
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

  $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error){
      $state.go("login");
   });
})

app.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('login', {
    url: '/',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    cache: false,
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    },
    controller: 'mainCtrl'
  })
  .state('search', {
    url: '/search',
    templateUrl: 'templates/search.html',
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    },
    controller: 'searchCtrl'
  })
  .state('add', {
    url: '/add',
    templateUrl: 'templates/add.html',
    cache: false,
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    },
    controller: 'addCtrl'
  })
  .state('like',{
    url: '/like',
    templateUrl: 'templates/like.html',
    cache: false,
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    },
    controller: 'likeCtrl'
  })
  .state('profile',{
    url: '/profile',
    templateUrl: 'templates/profile.html',
    cache: false,
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    },
    controller: 'profileCtrl'
  })
  .state('comment',{
    url: '/comment/:page/:id',
    templateUrl: 'templates/comment.html',
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    },
    controller: 'commentCtrl'
  })
  .state('signup',{
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  });
});
