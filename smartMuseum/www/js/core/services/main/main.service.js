/**
 * Main service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name MainService
     * @module app.core
     * @requires 
     * @description
     * Service to get the main data.
     *
     * @ngInject
     */
    function MainService($http, $q) {
        var mainService = {};
        var data = '';
        /**
         * @ngdoc method
         * @name MainService:get
         * @description
         * Retrieve main by id.
         *
         * @returns {promise} A promise which is resolved in main data.
         */
        mainService.subscribeExhibitions = function(artCategory, city, skip, limit, call_back_param) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/qbookexhi';
            $http({
                method: 'GET',
                url: baseUrl,
                params: {
                    'artCategory.cateName': artCategory,
                    'city': city,
                    'skip': skip,
                    'limit': limit,
                    'svanue': 1,
                    'sstartDate': -1
                },
                // cache: httpCache,
            }).success(function(data) {
                call_back_param(data);
            }).error(function() {});
        };
        /**
         * @ngdoc method
         * @name MainService:filterExhibitions
         * @description
         * Retrieve data by city and skip and limit .
         *
         * @returns {promise} A promise which is resolved in main data.
         */
        mainService.filterExhibitions = function(artCategory, city, skip, limit, call_back_param) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/qbookexhi';
            $http({
                method: 'GET',
                url: baseUrl,
                params: {
                    'artCategory.cateName': artCategory,
                    'city': city,
                    'skip': skip,
                    'limit': limit,
                    'svanue': 1,
                    'sstartDate': -1
                },
            }).success(function(data) {
                call_back_param(data);
            }).error(function() {

            });
        };
        /**
         * @ngdoc method
         * @name MainService:subscribeRefresh
         * @description,refresh data
         * Retrieve data by city and skip and limit .
         *
         * @returns {promise} A promise which is resolved in main data.
         */
        mainService.subscribeRefresh = function(artCategory, city, skip, limit, call_back_param) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/qbookexhi';
            $http({
                method: 'GET',
                url: baseUrl,
                params: {
                    'artCategory.cateName': artCategory,
                    'city': city,
                    'skip': skip,
                    'limit': limit,
                    'svanue': 1,
                    'sstartDate': -1
                },
            }).success(function(data) {
                call_back_param(data);
            }).error(function() {

            });
        };

        return mainService;
    }

    angular
        .module('app.core')
        .factory('MainService', MainService);

})();
