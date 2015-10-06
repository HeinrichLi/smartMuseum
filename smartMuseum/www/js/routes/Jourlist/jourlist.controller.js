/**
 * Jourlist controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name JourlistCtrl
     * @module app.jourlist
     * @description
     * Controller for the jourlist page.
     *
     * @ngInject
     */
    function JourCtrl($scope, $stateParams, GetJourlistService, $rootScope, $state) {
        var userID = $rootScope.user;
        var journeys = new Object();

        var fnGetJourList = function() {
            GetJourlistService.get(userID)
                .then(function(data) {
                    for (var index in data) {
                        data[index].date = data[index].date.substring(0, 10);
                    };
                    $scope.journeys = data;
                }, function(data) {
                    alert(data);
                });
        };

        fnGetJourList();

        //pull to Refresh
        $scope.doRefresh = function() {
            fnGetJourList();
            $scope.$broadcast('scroll.refreshComplete');
        };

        //Navigate to Exhibitio view
        $scope.go = function(exhibitionUUID) {
            $state.go('app.exhibition', {
                id: exhibitionUUID,
                navigation: 'app.Jourlist'
            });
        };

    }

    angular
        .module('app.jourlist')
        .controller('JourCtrl', JourCtrl);
})();
