/**
 * Exhibition service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ExhibitionService
     * @module app.core
     * @requires Restangular
     * @description
     * Service to get the exhibition data.
     *
     * @ngInject
     */
    function ExhibitionService($http,$q) {
        var ExhibitionService = {};
        var data = '';
        /**
         * @ngdoc method
         * @name ExhibitionService:get
         * @description
         * Retrieve exhibitions by id.
         *
         * @returns {promise} A promise which is resolved in exhibition data.
         */
        ExhibitionService.exhibition = function(id) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/exhibitions';
            var filterPara = '?$filter=_id eq ';
            var deferred = $q.defer();
            filterPara = filterPara + "'" + id + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展会信息失败！');
            });
            return deferred.promise;
        };

        return ExhibitionService;
    }

    angular
        .module('app.core')
        .factory('ExhibitionService', ExhibitionService);

})();
