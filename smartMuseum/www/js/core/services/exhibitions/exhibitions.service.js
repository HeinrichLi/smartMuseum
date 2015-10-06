/**
 * Exhibitions service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ExhibitionsService
     * @module app.core
     * @requires Restangular
     * @description
     * Service to get the exhibitions data.
     *
     * @ngInject
     */
    function ExhibitionsService($http, $q) {
        var ExhibitionsService = {};
        var data = '';
        /**
         * @ngdoc     var exhibitionService = {};
         * @name ExhibitionsService:get
         * @description
         * Retrieve exhibitions.
         *
         * @returns {promise} A promise which is resolved in exhibitions data.
         */
        ExhibitionsService.get = function(url,call_back_param, index) {
            // var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                // cache: httpCache,
            }).success(function(data) {
                // deferred.resolve(data);
                //把请求到得资源传递给callback

                call_back_param(data,index);
            }).error(function() {
                // deferred.reject('获取展会列表信息失败！');
            });
            // return deferred.promise;
        };

        return ExhibitionsService;
    }

    angular
        .module('app.core')
        .factory('ExhibitionsService', ExhibitionsService);

})();
