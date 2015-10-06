/**
 * GetExhiNotifications service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GetExhiNotifications
     * @module app.core
     * @requires 
     * @description
     * Service to get the User data.
     *
     * @ngInject
     */
    function GetExhiNotificationsService($http, $q) {
        var oGetExhiNotifications = new Object();
        var baseUrl = 'http://smartgallery.duapp.com/odata/notifications';
        var data = '';
        /**
         * @ngdoc method
         * @name GetExhiNotificationsService:get
         * @description
         * Retrieve GetExhiNotificationsService by id 
         *
         * @returns {promise} A promise which is resolved in ExhiNotifications data.
         */
        oGetExhiNotifications.get = function(userID) {
            var sFilter = "?$filter=user eq '"
            var sServiceUrl = baseUrl + sFilter + userID + "'";
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展会通知失败');
            });
            return deferred.promise;
        };
        return oGetExhiNotifications;
    }

    angular
        .module('app.core')
        .factory('GetExhiNotificationsService', GetExhiNotificationsService);
})();
