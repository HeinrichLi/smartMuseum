/**
 * Layout route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name layoutRoute
     * @module app.layout
     * @requires $stateProvider
     * @description
     * Router for the layout page.
     *
     * @ngInject
     */
    function layoutRoute($stateProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "js/routes/layout/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.tabs', {
                url: "/tabs",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/layout/tabs.html"
                    }
                }
            })
    }

    angular
        .module('app.layout')
        .config(layoutRoute);

})();
