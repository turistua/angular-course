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
})
.config(['StaffProvider', function(StaffProvider) {
    StaffProvider.setUrl('http://localhost:3000/people');
}]);