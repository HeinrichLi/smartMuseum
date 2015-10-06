/**
 * MyFavInfo service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name MyFavInfoService
     * @module app.core
     * @requires 
     * @description
     * Service to get the myFavInfo data.
     *
     * @ngInject
     */
    function MyFavInfoService($http, $q) {
        var myFavService = {};
        var artData = '';
        /**
         * @ngdoc method
         * @name MyFavInfoService:get
         * @description
         * Retrieve Art by id .
         *
         * @returns {promise} A promise which is resolved in art data.
         */
        myFavService.myfav = function(userid, artid) {
            var deferred = $q.defer();
            var baseUrl = 'http://smartgallery.duapp.com/odata/favorites';
            var filterPara = '?$filter=Art eq ';
            filterPara = filterPara + "'" + artid + "' and user eq '" + userid + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                //cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展品 收藏 信息失败！');
            });
            return deferred.promise;
        };

//read info of Fav gallery
        myFavService.myfav_ga = function(userid,gaid,call_back_param,index) {
            var deferred = $q.defer();
            var baseUrl = 'http://smartgallery.duapp.com/odata/fgalleries';
            var filterPara = '?$filter=gallery eq ';
            filterPara = filterPara + "'" + gaid + "' and user eq '" + userid + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                //cache: httpCache,
            }).success(function(data) {
                call_back_param(data,index);
            }).error(function() {
               call_back_param(data,index);
            });
            //return deferred.promise;
        };


//read info of Fav exhibition
        myFavService.myfav_ex = function(userid,exid,call_back_param,index) {
            var deferred = $q.defer();
            var baseUrl = 'http://smartgallery.duapp.com/odata/fexhibitions';
            var filterPara = '?$filter=exhibition eq ';
            filterPara = filterPara + "'" + exid + "' and user eq '" + userid + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                //cache: httpCache,
            }).success(function(data) {
                call_back_param(data,index);
            }).error(function() {
               // deferred.reject('获取展会 收藏 信息失败！');
            });
            //return deferred.promise;
        };

        return myFavService;
    }

    angular
        .module('app.core')
        .factory('MyFavInfoService', MyFavInfoService);

})();
