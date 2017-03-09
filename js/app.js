"use strict";

(function(){
  angular.module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
     "$stateProvider",
      RouterFunction
    ])

    .factory("PostsFactory", [
      "$resource",
      PostsFactoryFunction
    ])

    .controller("PostsIndexController", [
      "PostsFactory",
      PostsIndexControllerFunction
    ])

    .controller("PostShowController", [
      "PostsFactory",
      "$stateParams",
      PostsShowControllerFunction
    ])

    .controller("PostNewController", [
      "PostsFactory",
      "$state",
      PostNewControllerFunction
    ])

    .controller("PostEditController", [
      "PostsFactory",
      "$stateParams",
      "$state",
      PostEditControllerFunction
    ])


    function RouterFunction($stateProvider){
      $stateProvider
      .state("postsIndex", {
        url: "/posts",
        templateUrl: "js/ng-views/index.html",
        controller: "PostsIndexController",
        controllerAs: "vm"
      })
      .state("postNew", {
        url: "/posts/new",
        templateUrl: "js/ng-views/new.html",
        controller: "PostNewController",
        controllerAs: "vm"
      })
      .state("postShow", {
        url: "/posts/:id",
        templateUrl: "js/ng-views/show.html",
        controller: "PostShowController",
        controllerAs: "vm"
      })
      .state("postEdit", {
        url: "/posts/:id/edit",
        templateUrl: "js/ng-views/edit.html",
        controller: "PostEditController",
        controllerAs: "vm"
      })
    }


    function PostsFactoryFunction( $resource ) {
      return $resource( "http://localhost:3000/entries/:id", {}, {
        update: {method: "PUT" }
      });
    }

    function PostsIndexControllerFunction( PostsFactory ){
      this.posts = PostsFactory.query();
    }

    function PostNewControllerFunction( PostsFactory, $state ){
      this.post = new PostsFactory();
      this.create = function(){
        this.post.$save(function(post) {
          $state.go("postShow", {id: post.id})
        })
      }
    }

    function PostsShowControllerFunction(PostsFactory, $stateParams) {
      this.post = PostsFactory.get({id: $stateParams.id});
    }

    function PostEditControllerFunction (PostFactory, $stateParams, $state) {
      this.post = PostFactory.get({id: $stateParams.id});
      this.update = function() {
        this.post.$update({id: $stateParams.id}, function (post){
          $state.go("postShow", {id: post.id})
        })
      }
      this.destroy = function(){
        this.post.$delete({id: $stateParams.id}, function (post){
          $state.go('postsIndex')
        });
      }
    }
