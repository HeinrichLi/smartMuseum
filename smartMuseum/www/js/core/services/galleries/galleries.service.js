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
     * @name GalleriesService
     * @module app.core
     * @requires 
     * @description
     * Service to get the galleries data.
     *
     * @ngInject
     */
    function GalleriesService($http, $q) {
        var GalleriesService = {};
        var data = '';
        /**
         * @ngdoc method
         * @name GalleriesService:get
         * @description
         * Retrieve galleries.
         *
         * @returns {promise} A promise which is resolved in galleries data.
         */
        GalleriesService.get = function(url) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展馆列表信息失败！');
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
        GalleriesService.filter = function(city,skip,limit,call_back_param) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/Qgallery';
            $http({
                method: 'GET',
                url: baseUrl,
                params: {
                    'city': city,
                    'skip': skip,
                    'limit': limit
                },
                // cache: httpCache,
            }).success(function(data) {
                call_back_param(data);
            }).error(function(data) {
                call_back_param(data);
            });
        };

        return GalleriesService;
    }

    angular
        .module('app.core')
        .factory('GalleriesService', GalleriesService);

})();
