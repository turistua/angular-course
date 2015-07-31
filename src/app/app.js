'use strict';

angular.module('awesome-app', [
    'ui.router',
    'ui.bootstrap',
    'ngTagsInput',
    'ngLodash',
    'ngSanitize',
    'templates-app',
    'awesome-app.common',
    'awesome-app.home',
    'awesome-app.about'
]).
config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/tags');
}])
    .config(['StaffProvider', function(StaffProvider) {
            StaffProvider.setUrl('http://localhost:3000/people');
        }]);
