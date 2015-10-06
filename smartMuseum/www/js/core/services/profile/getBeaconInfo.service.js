/**
 * GetBeaconInfo service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GetBeaconInfoService
     * @module app.core
     * @requires 
     * @description
     * Service to get the BeaconInfo data.
     *
     * @ngInject
     */
    function GetBeaconInfoService($http, $q) {
        var oGetBeaconInfo = new Object();
        var baseUrl = 'http://smartgallery.duapp.com/odata/qbeacon?minor=';
        var data = '';
        /**
         * @ngdoc method
         * @name GetBeaconInfoService:get
         * @description
         * Retrieve GetBeaconInfoService by id 
         *
         * @returns {promise} A promise which is resolved in BeaconInfoService data.
         */
        oGetBeaconInfo.get = function(sMinorID) {
            var sServiceUrl = baseUrl + sMinorID + '&populate=true';
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取Beacon信息失败');
            });
            return deferred.promise;
        };

        return oGetBeaconInfo;
    }

    angular
        .module('app.core')
        .factory('GetBeaconInfoService', GetBeaconInfoService);

})();
