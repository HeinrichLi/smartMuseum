/**
 * getJourlist service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GetJourlistService
     * @module app.core
     * @requires 
     * @description
     * Service to get the Jourlist data.
     *
     * @ngInject
     */
    function GetJourlistService($http, $q) {
        var oGetJourlist = new Object();
        var baseUrl = 'http://smartgallery.duapp.com/odata/qjourney?user=';
        var data = '';
        /**
         * @ngdoc method
         * @name JourlistService:get
         * @description
         * Retrieve GetJourlist by id 
         *
         * @returns {promise} A promise which is resolved in Jourlist data.
         */
        oGetJourlist.get = function(userID) {
            var sServiceUrl = baseUrl + userID + '&populate=true';
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取行程信息失败');
            });
            return deferred.promise;
        };

        return oGetJourlist;
    }

    angular
        .module('app.core')
        .factory('GetJourlistService', GetJourlistService);

})();
