/**
 * Art service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ArtService
     * @module app.core
     * @requires 
     * @description
     * Service to get the art data.
     *
     * @ngInject
     */
    function ArtService($http, $q) {
        var artService = {};
        var artData = '';
        /**
         * @ngdoc method
         * @name ArtService:get
         * @description
         * Retrieve Art by id .
         *
         * @returns {promise} A promise which is resolved in art data.
         */
        artService.art = function(idn) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/arts';
            var filterPara = '?$filter=_id eq ';
            var deferred = $q.defer();
            filterPara = filterPara + "'" + idn + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展品信息失败！');
            });
            return deferred.promise;
        };

        return artService;
    }

    angular
        .module('app.core')
        .factory('ArtService', ArtService);

})();
