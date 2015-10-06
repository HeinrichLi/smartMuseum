/**
 * Galleries service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name iBeaconsService
     * @module app.core
     * @requires 
     * @description
     * Service to get the ibeacons data.
     *
     * @ngInject
     */
    function iBeaconsService($http, $q) {
        var iBeaconsService = {};
        var baseUrl='http://smartgallery.duapp.com/odata/beacons';
        /**
         * @ngdoc method
         * @name GalleriesService:get
         * @description
         * Retrieve galleries.
         *
         * @returns {promise} A promise which is resolved in galleries data.
         */
        iBeaconsService.get = function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取iBeacon信息失败！');
            });
            return deferred.promise;
        };

        /**
         * @ngdoc method
         * @name GalleriesService:filter
         * @description:filter galleries
         * Retrieve galleries.
         *
         * @returns {promise} A promise which is resolved in galleries data.
         */
        iBeaconsService.filter = function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl,
                params: {
                    'minor': id
                },
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('');
            });

            return deferred.promise;
        };

        return iBeaconsService;
    }

    angular
        .module('app.core')
        .factory('iBeaconsService', iBeaconsService);

})();
