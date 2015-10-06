/**
 * jourlist route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name jourlistRoute
     * @module app.jourlist
     * @requires $stateProvider
     * @description
     * Router for the jourlist page.
     *
     * @ngInject
     */
    function JourlistRoute($stateProvider) {
        $stateProvider
            .state('app.Jourlist', {
                url: "/Jourlist",
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/Jourlist/Jourlist.html",
                        controller: 'JourCtrl'
                    }
                }
            });
    }

    angular
        .module('app.jourlist')
        .config(JourlistRoute);

})();
