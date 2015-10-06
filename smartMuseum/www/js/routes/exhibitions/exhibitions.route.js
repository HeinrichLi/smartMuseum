/**
 * Exhibitions route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name exhibitionsRoute
     * @module app.exhibitions
     * @requires $stateProvider
     * @description
     * Router for the exhibitions page.
     *
     * @ngInject
     */
    function exhibitionsRoute($stateProvider) {
        $stateProvider
            .state('app.exhibitions', {
                cache: false,
                url: "/exhibitions/:_name/:_nav",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/exhibitions/exhibitions.html",
                        controller: 'ExhibitionsCtrl'
                    }
                }
            });
    }

    angular
        .module('app.exhibitions')
        .config(exhibitionsRoute);

})();
