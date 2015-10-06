/**
 * Ticket controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name TicketCtrl
     * @module app.ticket
     * @description
     * Controller for the ticket page.
     *
     * @ngInject
     */
    function TicketCtrl($scope, $stateParams) {
        $scope.id = $stateParams.id;
    }

    angular
        .module('app.ticket')
        .controller('TicketCtrl', TicketCtrl);
})();
