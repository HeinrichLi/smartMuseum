/**
 * Exhibition route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name exhibitionRoute
     * @module app.exhibition
     * @requires $stateProvider
     * @description
     * Router for the exhibition page.
     *
     * @ngInject
     */
    function exhibitionRoute($stateProvider) {
        $stateProvider
            .state('app.exhibition', {
                cache: false,
                url: "/exhibition/:id/:navigation/:name",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/exhibition/exhibition.html",
                        controller: 'ExhibitionCtrl'
                    }
                }
            })
            .state('app.sub_exhibition', {
                cache: false,
                url: "/sub_exhibition/:id/:name",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/exhibition/sub_exhibition.html",
                        controller: 'SubExhibitionCtrl'
                    }
                }
            })

        
    }

    angular
        .module('app.exhibition')
        .config(exhibitionRoute);

})();
