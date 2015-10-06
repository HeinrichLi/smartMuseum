/**
 * profile route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name profileRoute
     * @module app.profile
     * @requires $stateProvider
     * @description
     * Router for the profile page.
     *
     * @ngInject
     */
    function profileRoute($stateProvider) {
        $stateProvider
            .state('app.profile', {
                cache: false,
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/profile/profile.html",
                        controller: 'ProfileCtrl'
                    }
                }
            });
    }

    angular
        .module('app.profile')
        .config(profileRoute);

})();
