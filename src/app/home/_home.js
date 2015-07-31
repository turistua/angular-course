'use strict';

angular.module('awesome-app.home', ['ui.router']).

config(function config($stateProvider) {

    $stateProvider
        .state('tags', {
            url: '^/tags',
            controller: 'TagsCtrl',
            templateUrl: 'home/tags.tpl.html'
        })
        .state('grid', {
            url: '^/grid',
            controller: 'GridCtrl',
            templateUrl: 'home/grid.tpl.html'
        })
    ;
});
