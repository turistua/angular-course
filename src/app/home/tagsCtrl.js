'use strict';

angular.module('awesome-app.home').

    controller('TagsCtrl', function ($scope, $filter, lodash, Staff, teamsFactory) {

        $scope.init = function () {
            $scope.expandedState = false;
            $scope.currentTeam = teamsFactory.getCurrentTeam();
            $scope.tags = ($scope.currentTeam !== false) ? angular.copy($scope.currentTeam.members) : [];
        };
        $scope.init();

        Staff.list().success(function(data){
            $scope.peopleCollection = data;
        });


        $scope.tagsSyncVerification = function() {
            return (($scope.currentTeam !== false) && ($scope.tags.length > 0));
        };

        /**
         * move to Teams factory
         */

        $scope.syncPeople = function(direction) {
            if ($scope.currentTeam !== false) {
               console.log(direction);
               var team = teamsFactory.getTeam($scope.currentTeam.id);
               if (direction === 'forward') {
                   team.members = angular.copy($scope.tags);
                   teamsFactory.updateTeam(team);
               } else if (direction === 'backward') {
                   $scope.tags = angular.copy(team.members);
               }
            }
        };

        $scope.loadTags = function(query) {
            return Staff.search(query);
        };


    })
    .directive('teamvalidator', function () {
        var isValid = function(s) {
            return s && s.length > 1 && /[A-Za-z\d]+/g.test(s);
        };

        return {
            require:'ngModel',
            link:function (scope, elm, attrs, ngModelCtrl) {

                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('teamvalidator', isValid(viewValue));
                    return viewValue;
                });

                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('teamvalidator', isValid(modelValue));
                    return modelValue;
                });
            }
        };
    });

