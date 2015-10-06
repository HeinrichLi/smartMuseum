/**
 * Gallery controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name GalleryCtrl
     * @module app.gallery
     * @description
     * Controller for the gallery page.
     *
     * @ngInject
     */
    function GalleryCtrl($scope, $state, $rootScope, $stateParams, GA_BASE_URL, GalleryService) {
        var url = GA_BASE_URL.url + GA_BASE_URL._filter + "'" + $stateParams.name + "'";

        GalleryService.get(url)
            .then(function(data) {
                $scope.gallery = data;
            }, function(data) {
                alert(data);
            });
    }

    angular
        .module('app.gallery')
        .controller('GalleryCtrl', GalleryCtrl);
})();
