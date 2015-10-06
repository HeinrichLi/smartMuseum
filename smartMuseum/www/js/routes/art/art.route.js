/**
 * Art route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name Art Route
     * @module app.arts
     * @requires $stateProvider
     * @description
     * Router for the art page.
     *
     * @ngInject
     */
    function artRoute($stateProvider) {
        $stateProvider
            .state('app.paint', {
                cache: false,
                url: "/paint/:ex_id/:pa_id/:subject/:navigation",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/art/art.html",
                        controller: "ArtCtrl"
                    }
                }
            });
    }

    angular
        .module('app.art')
        .config(artRoute);

})();
