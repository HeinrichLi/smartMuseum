/**
 * removeFav service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name RemoveFavService
     * @module app.core
     * @requires 
     * @description
     * Service to get the art data.
     *
     * @ngInject
     */
    function RemoveFavService($http,$q) {
        var removeFav = {};
        /**
         * @ngdoc method
         * @name RemoveFavService:remove
         * @description
         * Retrieve RemoveFav by id .
         *
         * @returns {promise} A promise which is resolved in RemoveFav data.
         */
       removeFav.remove = function(favid) {
            var deferred = $q.defer();
            $http({
                method: 'delete',
                url: "http://smartgallery.duapp.com/odata/favorites(" + favid + ")",
                // cache: httpCache,
                data: {

                                 }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('删除 收藏 信息失败！');
            });
            return deferred.promise;

        };



        //remove fav for gallery
            removeFav.remove_gallery = function(gaid) {
            var deferred = $q.defer();
            $http({
                method: 'delete',
                url: "http://smartgallery.duapp.com/odata/fgalleries(" + gaid + ")",
                // cache: httpCache,
                data: {
                                 }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('删除 收藏 展馆失败！');
            });
            return deferred.promise;

        };


        //remove fav for exhibition
            removeFav.remove_exhibition = function(exid) {
            var deferred = $q.defer();
            $http({
                method: 'delete',
                url: "http://smartgallery.duapp.com/odata/fexhibitions(" + exid + ")",
                // cache: httpCache,
                data: {
                                 }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('删除 收藏 展馆失败！');
            });
            return deferred.promise;

        };

        return removeFav;
    }

    angular
        .module('app.core')
        .factory('RemoveFavService', RemoveFavService);

})();
