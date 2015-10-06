/**
 * ArtPraiseInfo service.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ArtPraiseInfoService
     * @module app.core
     * @requires
     * @description
     * Service to get the art data.
     *
     * @ngInject
     */
    function ArtPraiseInfoService($http, $q) {
        var artPraiseService = {};
        var artData = '';
        /**
         * @ngdoc method
         * @name ArtPraiseInfoService:get
         * @description
         * Retrieve ArtPraiseInfo by id .
         *
         * @returns {promise} A promise which is resolved in ArtPraiseInfo data.
         */
        artPraiseService.praise = function(artid, index, call_back_function) {

            var baseUrl = 'http://smartgallery.duapp.com/odata/praises';
            var filterPara = '?$filter=Art eq ';
            filterPara = filterPara + "'" + artid + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                //cache: httpCache,
            }).success(function(data) {
                call_back_function(data, index);
            }).error(function() {

            });

        };

        return artPraiseService;
    }

    angular
        .module('app.core')
        .factory('ArtPraiseInfoService', ArtPraiseInfoService);

})();
