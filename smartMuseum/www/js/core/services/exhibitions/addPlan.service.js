/**
 * AddPlan service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name AddPlanService
     * @module app.core
     * @requires 
     * @description
     * Service to add the AddPlan data.
     *
     * @ngInject
     */
    function AddPlanService($http, $cordovaCalendar, $ionicPopup) {
        var addPlan = {};
        /**
         * @ngdoc     
         * @name AddPlanService:post and addPhone
         * @description
         * Retrieve add plan.
         *
         * @returns
         */

        addPlan.post = function(user, planDate, id) {
            // var deferred = $q.defer();
            $http({
                method: 'post',
                url: "http://smartgallery.duapp.com/odata/journeys",
                // cache: httpCache,
                data: {
                    'user': user,
                    'date': planDate,
                    'exhibition': id
                }
            });

        };

        addPlan.addPhone = function(planDate, planLocal, planSub) {
            $cordovaCalendar.createEvent({
                title: planSub,
                location: planLocal,
                notes: '来自Smart Gallery',
                startDate: planDate,
                endDate: planDate
            }).then(function(result) {
                $ionicPopup.alert({
                    template: '行程已经加入日历'
                });
            }, function(err) {
                $ionicPopup.alert({
                    template: '加入日历失败'
                });
            });

        }
        return addPlan;
    }

    angular
        .module('app.core')
        .factory('AddPlanService', AddPlanService);

})();
