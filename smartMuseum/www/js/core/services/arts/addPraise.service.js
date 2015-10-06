/**
 * addPraise service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name AddPraiseService
     * @module app.core
     * @requires 
     * @description
     * Service to add the Praise data.
     *
     * @ngInject
     */
    function AddPraiseService($http,$q) {
        var addPraise = {};
        /**
         * @ngdoc method
         * @name ArtService:get
         * @description
         * Retrieve Art by id .
         *
         * @returns {promise} A promise which is resolved in art data.
         */
        addPraise.post = function(userid, artid) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: "http://smartgallery.duapp.com/odata/praises",
                // cache: httpCache,
                data: {
                    'user': userid,
                    'Art': artid
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('添加 点赞 信息失败！');
            });
            return deferred.promise;
        };

        return addPraise;
    }

    angular
        .module('app.core')
        .factory('AddPraiseService', AddPraiseService);

})();
