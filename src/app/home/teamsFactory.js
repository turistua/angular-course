/**
 * Created with JetBrains PhpStorm.
 * User: iburyak
 * Date: 5/21/15
 * Time: 6:33 PM
 * To change this template use File | Settings | File Templates.
 */
'use strict';
angular.module('awesome-app.home')
    .factory('teamsFactory', function (lodash) {
        var teams = {};
        var currentTeam = false;

        function getTeams() {
            return teams;
        }

        function getCurrentTeam() {
            return currentTeam;
        }

        function addTeam(data) {
            teams[data.id] = data;
        }

        function setCurrentTeam(id) {
            currentTeam = teams[id];
        }

        function getTeam(id) {
            return teams[id];
        }

        function updateTeam(data) {
            teams[data.id] = data;
        }

        return {
            getTeams: getTeams,
            updateTeam: updateTeam,
            addTeam: addTeam,
            getTeam: getTeam,
            getCurrentTeam: getCurrentTeam,
            setCurrentTeam: setCurrentTeam
        };
    });
