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
     * @name searchRoute
     * @module app.search
     * @requires $stateProvider
     * @description
     * Router for the search page.

     *
     * @ngInject
     */
    function searchRoute($stateProvider) {
        $stateProvider
            .state('app.search', {
                cache:true,
                url: "/search",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/search/search.html",
                        controller:  "SearchCtrl"
                    }
                }
            })
    }

    angular
        .module('app.search')
        .config(searchRoute);

})();
