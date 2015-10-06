/**
 * AddFav service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name AddFavService
     * @module app.core
     * @requires 
     * @description
     * Service to add the Fav data.
     *
     * @ngInject
     */
    function AddFavService($http, $q) {
        var addFav = {};
        /**
         * @ngdoc method
         * @name AddFavService:
         * @description
         * Retrieve Art by id .
         *
         * @returns {promise} A promise which is resolved in Fav data.
         */
        addFav.post = function(userid, artid) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: "http://smartgallery.duapp.com/odata/favorites",
                // cache: httpCache,
                data: {
                    'user': userid,
                    'Art': artid
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('添加 收藏 信息失败！');
            });
            return deferred.promise;

        };


        // Add fav of gallery
        addFav.post_gallery = function(userid, gaid) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: "http://smartgallery.duapp.com/odata/fgalleries",
                // cache: httpCache,
                data: {
                    'user': userid,
                    'gallery': gaid
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('添加 收藏 信息失败！');
            });
            return deferred.promise;
        };

        // Add fav of exhibition
        addFav.post_exhibition = function(userid, exid) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: "http://smartgallery.duapp.com/odata/fexhibitions",
                // cache: httpCache,
                data: {
                    'user': userid,
                    'exhibition': exid
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('添加 收藏 信息失败！');
            });
            return deferred.promise;
        };

        return addFav;
    }

    angular
        .module('app.core')
        .factory('AddFavService', AddFavService);

})();
