/**
 * main route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name main
     * @module app.main
     * @requires $stateProvider
     * @description
     * Router for the main page.
     *
     * @ngInject
     */
    function mainRoute($stateProvider) {
        $stateProvider
            .state('app.tabs.main', {
                cache: false,
                url: "/main",
                views: {
                    'main-tab': {
                        templateUrl: "js/routes/main/main.html",
                        controller: 'MainCtrl'
                    }
                }
            });
    }

    angular
        .module('app.main')
        .config(mainRoute);

})();
