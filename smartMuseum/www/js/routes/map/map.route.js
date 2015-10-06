/**
 * Map route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name mapRoute
     * @module app.map
     * @requires $stateProvider
     * @description
     * Router for the map page.
     *
     * @ngInject
     */
    function mapRoute($stateProvider) {
        $stateProvider
            .state('app.map', {
                cache: false,
                url: "/map/:address/:id",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/map/map.html",
                        controller: "MapCtrl"
                    }
                }
            });
    }

    angular
        .module('app.map')
        .config(mapRoute);

})();
