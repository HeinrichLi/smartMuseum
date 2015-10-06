/**
 * favlist route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name favlistRoute
     * @module app.favlist
     * @requires $stateProvider
     * @description
     * Router for the favlist page.
     *
     * @ngInject
     */
    function favlistRoute($stateProvider) {
        $stateProvider
            .state('app.favlist', {
                cache: false,
                url: "/favlist",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/favlist/favlist.html",
                        controller: 'FavCtrl'
                    }
                }
            });
    }

    angular
        .module('app.favlist')
        .config(favlistRoute);

})();
