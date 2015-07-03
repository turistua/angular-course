/**
 * Created with JetBrains PhpStorm.
 * User: iburyak
 * Date: 6/26/15
 * Time: 5:28 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';

angular.module('awesome-app.home')
    .directive('teams', function(teamsFactory, $filter, lodash) {
        return {
            scope: {
                currentTeam: "=",
                tags: "="
            },
            templateUrl: "../app/home/team.html",
            restrict: 'E',
            link: function (scope, elem, attrs) {
                scope.teams = teamsFactory.getTeams();
                scope.currentTeam = teamsFactory.getCurrentTeam();
                scope.tags = [];

                scope.addTeam = function() {
                    var id = new Date().getTime();
                    var isFirst = ! Object.keys(scope.teams).length;
                    var teamData = {
                        'name': scope.newTeam.name,
                        'id': id,
                        'members': []
                    };
                    teamsFactory.addTeam(teamData);
                    if (isFirst) {
                        scope.setCurrentTeam(teamData.id);
                    }
                    scope.resetTeamField();
                };
                scope.resetTeamField = function() {
                    scope.newTeam = {};
                };

                scope.setCurrentTeam = function (id) {
                    teamsFactory.setCurrentTeam(id);
                    scope.currentTeam = teamsFactory.getCurrentTeam();
                    scope.tags = angular.copy(scope.currentTeam.members);
                };

                scope.isCurrentTeam = function(teamId) {
                    return teamId === scope.currentTeam.id;
                    //return teamId === teamsFactory.getCurrentTeam().id;
                };

                var locateTeamById = function(id) {
                    var result = $filter('filter')(teamsFactory.getTeams(), {id: id});
                    return result[id];
                };

                scope.removeMember = function(member) {
                    var currentTeamId = teamsFactory.getCurrentTeam().id;
                    var team = teamsFactory.getTeam(currentTeamId);

                    team.members = lodash.difference(team.members, [member]);
                    teamsFactory.updateTeam(team);
                };

                scope.expandTeam = function(id) {
                    return id === teamsFactory.getCurrentTeam().id;
                };

            }
        };
    });
