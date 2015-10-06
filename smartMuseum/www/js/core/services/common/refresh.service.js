/**
 * refresh service.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name RefreshService
     * @module app.core
     * @requires
     * @description
     * Service to get the refresh data.
     *
     * @ngInject
     */
    function RefreshService($http, $q) {
        var RefreshService = {};
        var data = '';
        /**
         * @ngdoc method
         * @name RefreshService:get
         * @description
         * Retrieve RefreshService.
         *
         * @returns {promise} A promise which is resolved in refresh data.
         */
        RefreshService.get = function(url, message) {
            var deferred = $q.defer();
            console.log('request');
            $http({
                method: 'GET',
                url: url,
                // cache: httpCache,
            }).success(function(data) {
              console.log('defer');
                deferred.resolve(data);

            }).error(function() {
                deferred.reject('message');
            });
            return deferred.promise;
        };

        RefreshService.loadMore = function(url, message, call_back_param) {
            $http({
                method: 'GET',
                url: url,
                // cache: httpCache,
            }).success(function(data) {
                call_back_param(data);
            }).error(function() {

            });
        };

        return RefreshService;
    }

    angular
        .module('app.core')
        .factory('RefreshService', RefreshService);

})();
