/**
 * Gallery route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name Gallery Route
     * @module app.ibeacons
     * @requires $stateProvider
     * @description
     * Router for the galleries page.
     *
     * @ngInject
     */
    function ibeaconsRoute($stateProvider) {
        $stateProvider.state('app.ibeacons', {
            cache: false,
            url: "/ibeacons/:minor/:navigation",
            views: {
                'menuContent': {
                    templateUrl: "js/routes/ibeacons/ibeacons.html",
                    controller: 'iBeaconsCtrl'
                }
            }
        })
    }

    angular
        .module('app.ibeacons')
        .config(ibeaconsRoute);

})();
