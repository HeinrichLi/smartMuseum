/**
 * Ad service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name AdService
     * @module app.core
     * @requires 
     * @description
     * Service to get the ad data.
     *
     * @ngInject
     */
    function AdService($http, $q) {
        var adService = {};
        var baseUrl = 'http://smartgallery.duapp.com/odata/adverts';
        var adData = '';
        /**
         * @ngdoc method
         * @name AdService:get
         * @description
         * Retrieve ad.
         *
         * @returns {promise} A promise which is resolved in da data.
         */
        adService.ad = function() {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取广告信息失败！');
            });
            return deferred.promise;
        };

        return adService;
    }

    angular
        .module('app.core')
        .factory('AdService', AdService);

})();
