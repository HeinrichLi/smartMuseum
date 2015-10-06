/**
 * Ticket route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name ticketRoute
     * @module app.ticket
     * @requires $stateProvider
     * @description
     * Router for the ticket page.
     *
     * @ngInject
     */
    function ticketRoute($stateProvider) {
        $stateProvider
            .state('app.ticket', {
                cache: false,
                url: "/ticket/:id",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/ticket/ticket.html",
                        controller: "TicketCtrl"
                    }
                }
            });
    }

    angular
        .module('app.ticket')
        .config(ticketRoute);

})();
