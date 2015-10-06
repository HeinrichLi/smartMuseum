/**
 * myPraiseInfo service.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name MyPraiseInfoService
     * @module app.core
     * @requires
     * @description
     * Service to get the PraiseInfo data.
     *
     * @ngInject
     */
    function MyPraiseInfoService($http, $q) {
        var myPraiseService = {};
        /**
         * @ngdoc method
         * @name MyPraiseInfoService:get
         * @description
         * Retrieve Art by id .
         *
         * @returns {promise} A promise which is resolved in art data.
         */
        myPraiseService.mypraise = function(userid, artid, index, call_back_function) {

            var baseUrl = 'http://smartgallery.duapp.com/odata/praises';
            var filterPara = '?$filter=Art eq ';
            filterPara = filterPara + "'" + artid + "' and user eq '" + userid + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                //cache: httpCache,
            }).success(function(data) {
                call_back_function(data, index);
            }).error(function() {
                //deferred.reject('获取展品 是否赞 信息失败！');
            });

        };

        return myPraiseService;
    }

    angular
        .module('app.core')
        .factory('MyPraiseInfoService', MyPraiseInfoService);

})();
