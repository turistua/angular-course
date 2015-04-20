'use strict';
/**
 * @ngdoc service
 * @description
 */
angular.module('awesome-app.home')
    .provider('Staff', function StaffProvider() {
        var url,
            myHttp,
            _save = function (person) {
                return (person.id) ? myHttp.put(url + '/' + person.id, person) : myHttp.post(url, person);
            },
            _get = function (id){
                return myHttp.get(url + "/" + id);
            },
            _list = function() {
                return myHttp.get(url);
            },
            _search = function(q) {
                var str = (q !== '') ? '?q=' + q : '';
                var output = [];
                return myHttp.get(url + str).then(function(response) {
                    angular.forEach(response.data, function (value, key) {
                        output.push({"text": value.name});
                    });
                    return output;
                });

            },
            _delete = function (id) {
                return myHttp.delete(url+ "/" + id);
            };
        return {
            setUrl: function(u) {
                url = u;
            },
            $get: function($http) {
                myHttp = $http;
                return {
                    get: _get,
                    list: _list,
                    search: _search,
                    delete: _delete,
                    save: _save
                };
            }
        };
    });