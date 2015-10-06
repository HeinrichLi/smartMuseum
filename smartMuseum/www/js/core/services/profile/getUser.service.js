/**
 * getUser service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GetUserService
     * @module app.core
     * @requires 
     * @description
     * Service to get the User data.
     *
     * @ngInject
     */
    function GetUserService($http, $q) {
        var oGetUser = new Object();
        var baseUrl = 'http://smartgallery.duapp.com/odata/users';
        var data = '';
        /**
         * @ngdoc method
         * @name GetUserService:get
         * @description
         * Retrieve User by id 
         *
         * @returns {promise} A promise which is resolved in User data.
         */
        oGetUser.get = function(userID) {
            var sServiceUrl = baseUrl + "?$filter=user eq '" + userID + "'";
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取用户信息失败');
            });
            return deferred.promise;
        };
        /**
         * @ngdoc method
         * @name:Fav PUT
         * @description
         *
         */
        oGetUser.postfav = function(userUUID, sFav) {
            var sServiceUrl = baseUrl + '(' + userUUID + ')';
            $http({
                method: 'PUT',
                url: sServiceUrl,
                data: {
                    'favorCategory': sFav
                }
            });
        };

        return oGetUser;
    }

    angular
        .module('app.core')
        .factory('GetUserService', GetUserService);
})();
