/**
 * Arts route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name Arts Route
     * @module app.arts
     * @requires $stateProvider
     * @description
     * Router for the arts page.
     *
     * @ngInject
     */
    function artsRoute($stateProvider) {
        $stateProvider
            .state('app.tabs.paints', {
                cache: false,
                url: "/paints/:id/:subject/:cate",
                views: {
                    'paints-tab': {
                        templateUrl: "js/routes/arts/paints.html",
                        controller: 'PaintsCtrl'
                    }
                }
            })

            .state('app.arts', {
                cache: false,
                url: "/arts/:id/:subject",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/arts/arts.html",
                        controller: 'ArsCtrl'
                    }
                }
            });
    }

    angular
        .module('app.arts')
        .config(artsRoute);

})();
