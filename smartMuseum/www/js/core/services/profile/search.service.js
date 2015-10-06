/**
 * search service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name SearchService
     * @module app.search
     * @requires 
     * @description
     * Service to get the art,gallery,exhibition data.
     *
     * @ngInject
     */
    function SearchService($http, $q) {
        var Service = {};
        var Data = '';

        Service.search =function(type,query)
        {
            if (type==0) {
                return this.exhibition(query);
            }else if (type==1) {
                return this.art(query);
            }else if (type ==2) {
                return this.gallery(query);
            };
        }
        /**
         * @ngdoc method
         * @name Service:get
         * @description
         * Retrieve Art by query .
         *
         * @returns {promise} A promise which is resolved in art data.
         */
        Service.art = function(query) {
            var baseUrl = 'http://smartgallery.duapp.com/odata/arts';
            var filterPara = '?$filter=indexof(title,';
            var deferred = $q.defer();
            filterPara = filterPara + "'" + query + "') ge 0";
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

        Service.exhibition=function(query)
        {
            var baseUrl = 'http://smartgallery.duapp.com/odata/exhibitions';
            var filterPara = '?$filter=indexof(subject,';
            var deferred = $q.defer();
            filterPara = filterPara + "'" + query + "') ge 0";
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

        Service.gallery=function(query)
        {
            var baseUrl = 'http://smartgallery.duapp.com/odata/galleries';
            var filterPara = '?$filter=indexof(name,';
            var deferred = $q.defer();
            filterPara = filterPara + "'" + query + "') ge 0";
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

        return Service;
    }

    angular
        .module('app.core')
        .factory('SearchService', SearchService);
})();
