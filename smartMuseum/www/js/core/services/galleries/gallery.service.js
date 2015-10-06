/**
 * Gallery service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GalleryService
     * @module app.core
     * @requires 
     * @description
     * Service to get the gallery data.
     *
     * @ngInject
     */
    function GalleryService($http, $q) {
        var GalleryService = {};
        var data = '';
        /**
         * @ngdoc method
         * @name GalleryService:get
         * @description
         * Retrieve gallery.
         *
         * @returns {promise} A promise which is resolved in gallery data.
         */
        GalleryService.get = function(url) {
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
        return GalleryService;
    }

    angular
        .module('app.core')
        .factory('GalleryService', GalleryService);

})();
