/**
 * Notification route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name notificationRoute
     * @module app.notification
     * @requires $stateProvider
     * @description
     * Router for the notification page.
     *
     * @ngInject
     */
    function notificationRoute($stateProvider) {
        $stateProvider
            .state('app.notificationlist', {
                cache: false,
                url: "/notificationlist",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/notificationlist/notificationlist.html",
                        controller: 'NotificationCtrl'
                    }
                }
            });
    }

    angular
        .module('app.notification')
        .config(notificationRoute);

})();
