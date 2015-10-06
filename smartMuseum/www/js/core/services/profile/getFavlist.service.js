/**
 * getFavlist service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name GetFavlistService
     * @module app.core
     * @requires 
     * @description
     * Service to get the Favlist data.
     *
     * @ngInject
     */
    function GetFavlistService($http, $q) {
        var oGetFavList = new Object();
        var artUrl = 'http://smartgallery.duapp.com/odata/qfavorite?user=';
        var galleryUrl = 'http://smartgallery.duapp.com/odata/QfGallery?user=';
        var exhibitionUrl ='http://smartgallery.duapp.com/odata/QFExhibition?user=';
        
        /**
         * @ngdoc method
         * @name FavlistService:get
         * @description
         * Retrieve Favlist by id 
         *
         * @returns {promise} A promise which is resolved in Favlist data.
         */
        oGetFavList.getArt = function(userID) {
            var sServiceUrl = artUrl + userID + '&populate=true';
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取收藏信息失败');
            });

            return deferred.promise;
        };

        oGetFavList.getGallery = function(userID) {
            var sServiceUrl = galleryUrl + userID + '&populate=true';
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取收藏信息失败');
            });

            return deferred.promise;
        };

        oGetFavList.getExhibition = function(userID) {
            var sServiceUrl = exhibitionUrl + userID + '&populate=true';
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: sServiceUrl
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取收藏信息失败');
            });

            return deferred.promise;
        };

        return oGetFavList;
    }

    angular
        .module('app.core')
        .factory('GetFavlistService', GetFavlistService);

})();
