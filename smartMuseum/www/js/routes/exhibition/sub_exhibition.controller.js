/**
 * Exhibition controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name ExhibitionCtrl
     * @module app.exhibition
     * @description
     * Controller for the exhibition page.
     *
     * @ngInject
     */
    function SubExhibitionCtrl($scope, $stateParams, $state, $rootScope, ExhibitionService, $ionicModal, AddPlanService) {
        $scope.user = $rootScope.user;

        //get Navigation from income page, if null back to main.
        $scope.navigation = $stateParams.navigation;

        if ($scope.navigation == "") {
            $scope.navigation = "app.tabs.main";
        };

        ExhibitionService.exhibition($stateParams.id)
            .then(function(data) {
                $scope.exhibition = data;
                // convert format of date change - to .
                var str1 = $scope.exhibition.value[0].startDate;
                var str2 = $scope.exhibition.value[0].endDate;
                $scope.date1 = str1.replace(/\-/g, "\.");
                $scope.date2 = str2.replace(/\-/g, "\.");

            }, function(data) {
                alert(data);
            });

        // $rootScope.navigation = 'app.exhibition';
        //code for planning
        $scope.myModal = {
            addCalendar: false,
            planDate: new Date()
        };

        $ionicModal.fromTemplateUrl("js/routes/exhibition/plan.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.postData = function() {
            AddPlanService.post($rootScope.user, $scope.myModal.planDate, $stateParams.id);
            if ($scope.myModal.addCalendar === true) {

                AddPlanService.addPhone($scope.myModal.planDate, $scope.exhibition.value[0].address, $scope.exhibition.value[0].subject);

            }


        };

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.addPlan = function() {
            $scope.postData();
            $scope.modal.hide();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        $scope.go = function() {
            $state.go('app.exhibitions', {
                '_name': $stateParams.name,
                '_nav': 'app.tabs.galleries'
            });
        }
    }

    angular
        .module('app.exhibition')
        .controller('SubExhibitionCtrl', SubExhibitionCtrl);
})();
