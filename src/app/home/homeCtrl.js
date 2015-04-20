'use strict';

angular.module('awesome-app.home').

    controller('HomeCtrl', function ($scope, $filter, lodash, Staff) {

        $scope.teams = {};
        $scope.tags = [];
        $scope.currentTeam = false;
        $scope.expandedState = false;

        Staff.list().success(function(data){
            $scope.peopleCollection = data;
        });


        $scope.isCurrentTeam = function(teamId) {
            return teamId === $scope.currentTeam.id;
        };

        $scope.setCurrentTeam = function(teamId) {
            $scope.currentTeam = locateTeamById(teamId);
            $scope.tags = angular.copy($scope.currentTeam.members);
        };

        var locateTeamById = function(id) {
            var result = $filter('filter')($scope.teams, {id: id});
            return result[id];
        };

        $scope.removeMember = function(member) {
            $scope.teams[$scope.currentTeam.id].members = lodash.difference($scope.teams[$scope.currentTeam.id].members, [member]);
        };

        $scope.expandTeam = function(id) {
            return id === $scope.currentTeam.id;
        };

        $scope.tagsSyncVerification = function() {
            return (($scope.currentTeam !== false) && ($scope.tags.length > 0));
        };

        $scope.syncPeople = function(direction) {
            if ($scope.currentTeam !== false) {
                console.log(direction);
               if (direction === 'forward') {
                   $scope.teams[$scope.currentTeam.id].members = angular.copy($scope.tags);
               } else if (direction === 'backward') {
                   $scope.tags = angular.copy($scope.teams[$scope.currentTeam.id].members);
               }
            }
        };

        $scope.addPerson = function(person) {
            if ($scope.currentTeam !== false && person !== '') {
                $scope.teams[$scope.currentTeam.id].members.push({"text": person});
                $scope.syncPeople('backward');
            } else {
                console.log(person);
            }
        };



        $scope.addTeam = function() {
            var id = new Date().getTime();
            var isFirst = ! Object.keys($scope.teams).length;
            $scope.teams[id] = {
                'name': $scope.newTeam.name,
                'id': id,
                'members': []
            };
            if (isFirst) {
                $scope.setCurrentTeam(id);
            }
            $scope.resetTeamField();
        };

        $scope.loadTags = function(query) {
            return Staff.search(query);
        };

        $scope.resetTeamField = function() {
            $scope.newTeam = {};
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

