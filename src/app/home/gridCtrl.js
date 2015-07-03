'use strict';

angular.module('awesome-app.home').

    controller('GridCtrl', function ($scope, $filter, lodash, Staff, teamsFactory) {

        $scope.expandedState = false;
        $scope.currentTeam = teamsFactory.getCurrentTeam();

        Staff.list().success(function(data){
            $scope.peopleCollection = data;
        });

        $scope.addPerson = function(person) {
            if ($scope.currentTeam !== false && person !== '') {
                var team = teamsFactory.getTeam($scope.currentTeam.id);
                team.members.push({"text": person});
                teamsFactory.updateTeam(team);
                //$scope.syncPeople('backward');
            } else {
                console.log(person);
            }
        };

        $scope.loadTags = function(query) {
            return Staff.search(query);
        };


    });

