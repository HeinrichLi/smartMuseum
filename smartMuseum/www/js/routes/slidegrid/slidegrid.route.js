/**
 * Slidegrid route.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name Slidegrid Route
     * @module app.slidegrid
     * @requires $stateProvider
     * @description
     * Router for the arts page.
     *
     * @ngInject
     */
    function slidegridRoute($stateProvider) {
        $stateProvider
            .state('app.slidepaints', {
                cache: false,
                url: "/paints/slide/:id/:myindex/:navigation/:title/:cate",

                views: {
                    'menuContent': {
                        templateUrl: "js/routes/slidegrid/slidepaints.html",
                        controller: 'SlideCtrl'

                    }
                }


            })

            .state('app.gridpaints', {
                cache: false,
                url: "/paints/grid/:navigation/:from/:title/:id/:cate/:myindex",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/slidegrid/gridpaints.html",
                        controller: 'GridCtrl'
                    }
                }
            });
    }


    angular
        .module('app.slidegrid')
        .config(slidegridRoute);

})();
