/**
 * new controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name NewsCtrl
     * @module app.news
     * @description
     * Controller for the news page.
     *
     * @ngInject
     */
    function NewsCtrl($scope, $state, $stateParams) {
        $scope.id = $stateParams.id;
        $scope.title = $stateParams.title;
        $scope.posterURL = $stateParams.posterURL;
        $scope.description = $stateParams.description;
        $scope.subTitle = $stateParams.subTitle;
    }

    angular
        .module('app.news')
        .controller('NewsCtrl', NewsCtrl);
})();
