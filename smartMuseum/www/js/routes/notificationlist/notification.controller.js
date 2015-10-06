/**
 * Notification controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name NotificationCtrl
     * @module app.notification
     * @description
     * Controller for the notification page.
     *
     * @ngInject
     */
    function NotificationCtrl($scope, $rootScope, GetExhiNotificationsService, GetBeaconVistNotificationsService, GetBeaconInfoService, $state) {
        var userID = $rootScope.user;

        var fnSetStateChange = function(bState) {
            if ($rootScope.showExhibitionNotification === undefined && bState === undefined) {
                $rootScope.showExhibitionNotification = true;
            } else {
                $rootScope.showExhibitionNotification = bState;
                $scope.showExhibitionNotification = $rootScope.showExhibitionNotification;
            };
            $scope.showPaintNotification = !$rootScope.showExhibitionNotification;
            $scope.showExhibitionNotification = !$scope.showPaintNotification;
        };

        var fnGetExhiNotifications = function() {
            GetExhiNotificationsService.get(userID)
                .then(function(data) {
                    $scope.ExhiNotifications = data.value;
                }, function(data) {
                    alert(data);
                });
        };

        var fnGetBeaconInfo = function(sBeaconID, index) {
            GetBeaconInfoService.get(sBeaconID)
                .then(function(data) {
                    $scope.visits[index].BeaconInfo = data[0];
                }, function(data) {
                    alert(data);
                });
        };

        var fnGetBeaconVist = function(userID) {
            GetBeaconVistNotificationsService.get(userID)
                .then(function(data) {
                    $scope.visits = data.value;
                    // for (var index in $scope.visits) {
                    //     $scope.visits[index].startTime = $scope.visits[index].startTime.substring(0, 19);
                    //     fnGetBeaconInfo($scope.visits[index].minor, index);
                    // };
                }, function(data) {
                    alert(data);
                });
        };

        $scope.ExhibitionNotfication = function() {
            fnSetStateChange(true);
            fnGetExhiNotifications();
        };

        $scope.PaintnNotfication = function() {
            fnSetStateChange(false);
            fnGetBeaconVist(userID);
        };

        $scope.goExhi = function(exhibitionUUID) {
            $state.go('app.exhibition', {
                id: exhibitionUUID,
                navigation: 'app.notificationlist'
            });
        };


        $scope.goPaint = function(minorID) {
            $state.go('app.ibeacons', {
                minor: minorID,
                navigation: 'app.notificationlist'
            });
        };

        fnSetStateChange($rootScope.showExhibitionNotification);
        if ($rootScope.showExhibitionNotification) {
            fnGetExhiNotifications();
        } else {
            fnGetBeaconVist(userID);
        };
    }

    angular
        .module('app.notification')
        .controller('NotificationCtrl', NotificationCtrl);
})();
