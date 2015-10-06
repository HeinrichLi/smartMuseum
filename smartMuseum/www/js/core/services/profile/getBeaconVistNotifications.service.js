/**
 * GetBeaconVistNotifications service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GetBeaconVistNotificationsService
     * @module app.core
     * @requires 
     * @description
     * Service to get the BeaconVistNotifications data.
     *
     * @ngInject
     */
    function GetBeaconVistNotificationsService($http, $q) {
        var oBeaconVistNotifications = new Object();
        var baseUrl = 'http://smartgallery.duapp.com/odata/beaconvisits';
        var data = '';
        /**
         * @ngdoc method
         * @name GetBeaconVistNotificationsService:get
         * @description
         * Retrieve BeaconVistNotificationsService by id 
         *
         * @returns {promise} A promise which is resolved in BeaconVistNotificationsService data.
         */
        oBeaconVistNotifications.get = function(userID) {
            var sFilter = "?$filter=user eq '"
            var sServiceUrl = baseUrl + sFilter + userID + "'";
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展品通知失败');
            });
            return deferred.promise;
        };

        return oBeaconVistNotifications;
    }

    angular
        .module('app.core')
        .factory('GetBeaconVistNotificationsService', GetBeaconVistNotificationsService);
})();
