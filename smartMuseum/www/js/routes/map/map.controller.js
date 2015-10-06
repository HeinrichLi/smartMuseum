/**
 * Map controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name MapCtrl
     * @module app.map
     * @description
     * Controller for the map page.
     *
     * @ngInject
     */
    function MapCtrl($scope, $location, $stateParams) {
        $scope.ID = $stateParams.id;
        var sGallaryAddress = $stateParams.address;

        // use Baid API to get Current Position & Show Driving Route
        var oAddresses = {
            CurrentLocation: null,
            TargetAddress: sGallaryAddress
        };
        oMap.initBaiduMap(oAddresses);

    }

    angular
        .module('app.map')
        .controller('MapCtrl', MapCtrl);
})();
