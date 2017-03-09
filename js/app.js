"use strict";
var igData = [
 {id: 0, photo_url: 'http://static.srcdn.com/wp-content/uploads/Superman-3D-Art.jpg'  author: "Superman", body: "DC"
 {id: 1, photo_url: 'http://static.srcdn.com/wp-content/uploads/Superman-3D-Art.jpg'  author: "Incredible Hulk", body: "Marvel"
 {id: 2, photo_url: 'http://static.srcdn.com/wp-content/uploads/Superman-3D-Art.jpg'  author: "InspectorGadget", body: "Marvel"
]


angular
  .module("wdinstagram", ["ui.router"
  "ngResource"])
  .config(["$stateProvider", RouterFunction])
  .factory("IGFactory", [
    "$resource",
    WDIGFactoryFunction
  ])
  .controller("WDIGIndexController", [
    "IGFactory",
    WDIGIndexControllerFunction
  ])
  .controller("WDIGIndexController", [
    "IGFactory",
    "$state",
    WDIGNewControllerFunction
  ])
  .controller("WDIGShowController",[
    "IGFactory",
    "$stateParams",
    "$state",
    WDIGEditControllerFunction
  ])

  function RouterFunction($stateProvider){
    $stateProvider
    .state("wdigIndex", {
      url: "/ig",
      templateUrl: "js/ng-views/index.html",
      controller: "WDIGIndexController",
      controllerAs: "vm"
    })
    .state("wdigNew", {
      url: "/ig/new",
      templateUrl: "js/ng-views/new.html",
      controller: "WDIGNewController",
      controllerAs: "vm"
    })
    .state("wdigShow", {
      url: "/ig/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "WDIGShowController"
      controllerAs: "vm"
    })
    .state("wdigEdit", {
      url: "/ig/:id/edit",
      templateUrl: "js/ng-views/edit.html",
      controller: "WDIGEditController",
      controllerAs: "vm"
    })
  }

  function WDIGFactoryFunction($resource){
    return $resource("http://localhost:3000/entries/:id",{}, {
      update: {method:"PUT"}
    })
  }

  function WDIGIndexControllerFunction(IGFactory) {
    this.grams = IGFactory.query();
  }

  function WDIGNewControllerFunction(IGFactory, $state){
    this.ig = new IGFactory();
    this.create = function(){
      this.ig.$save(function(gram) {
        $state.go("igShow", {id: ig.id})
      })
    }
  }

  function WDIGShowControllerFunction(IGFactory, $stateParams) {
    this.ig = IGFactory.get({id: $stateParams.id});
  }

  function WDIGEditControllerFunction(IGFactory, $stateParams, $state) {
    this.ig = IGFactory.get({id: $stateParams.id});
    this.update = function(){
      this.ig.$update({id: $stateParams.id}, function(ig) {
        $state.go("igShow", {id: ig.id})
      })
    }
    this.destroy = function(){
      this.ig.$delete({id: $stateParams.id}, function(){
        $state.go("igIndex")
      })
    }
  }
