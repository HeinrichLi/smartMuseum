/**
 * removePraise service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name removePraiseService
     * @module app.core
     * @requires 
     * @description
     * Service to remove the Praise data.
     *
     * @ngInject
     */
    function RemovePraiseService($http, $q) {
        var removePraise = {};
        /**
         * @ngdoc method
         * @name RemovePraiseService:remove
         * @description
         * Retrieve Remove Praise by id .
         *
         * @returns {promise} A promise which is resolved in Praise data.
         */
        removePraise.remove = function(praiseid) {
            var deferred = $q.defer();
            $http({
                method: 'delete',
                url: "http://smartgallery.duapp.com/odata/praises(" + praiseid + ")",
                // cache: httpCache,
                data: {

                                 }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('删除 点赞 信息失败！');
            });
            return deferred.promise;

        };

        return removePraise;
    }

    angular
        .module('app.core')
        .factory('RemovePraiseService', RemovePraiseService);

})();
