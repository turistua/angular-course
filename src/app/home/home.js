'use strict';

angular.module('awesome-app.home', ['ui.router']).

config(function config($stateProvider) {

    $stateProvider
        .state('home', {
            url: '^/home',
            controller: 'HomeCtrl',
            templateUrl: 'home/home.tpl.html'
        });
})
.config(['StaffProvider', function(StaffProvider) {
    StaffProvider.setUrl('http://localhost:3000/people');
}])
;