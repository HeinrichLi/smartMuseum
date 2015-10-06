/**
 * profile controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name profileCtrl
     * @module app.profile
     * @description
     * Controller for the profile page.
     *
     * @ngInject
     */
    function ProfileCtrl($scope, $stateParams, GetUserService, GetFavlistService, GetJourlistService, $rootScope, $ionicPopup) {
        var userID = $rootScope.user;
        $scope.user = new Object();

        var aStyles = ['button-outline', 'button-clear'];

        var subscribers = [{
            id: 1,
            description: '国画-山水画',
            subscribeStatus: false,
            setStyle: function(option) {
                if (option === true) {
                    $scope.user.style1 = aStyles[0];
                } else {
                    $scope.user.style1 = aStyles[1]
                };
            }
        }, {
            id: 2,
            description: '国画-花鸟画',
            subscribeStatus: false,
            setStyle: function(option) {
                if (option === true) {
                    $scope.user.style2 = aStyles[0];
                } else {
                    $scope.user.style2 = aStyles[1];
                };
            }
        }, {
            id: 3,
            description: '版画',
            subscribeStatus: false,
            setStyle: function(option) {
                if (option === true) {
                    $scope.user.style3 = aStyles[0];
                } else {
                    $scope.user.style3 = aStyles[1];
                };
            }
        }, {
            id: 4,
            description: '油画',
            subscribeStatus: false,
            setStyle: function(option) {
                if (option === true) {
                    $scope.user.style4 = aStyles[0];
                } else {
                    $scope.user.style4 = aStyles[1];
                };
            }
        }, {
            id: 5,
            description: '书法',
            subscribeStatus: false,
            setStyle: function(option) {
                if (option === true) {
                    $scope.user.style5 = aStyles[0];
                } else {
                    $scope.user.style5 = aStyles[1];
                };
            }
        }, {
            id: 6,
            description: '国画-人物画',
            subscribeStatus: false,
            setStyle: function(option) {
                if (option === true) {
                    $scope.user.style6 = aStyles[0];
                } else {
                    $scope.user.style6 = aStyles[1];
                };
            }
        }];

        //set user favorCateglory
        var setUserfavorCategory = function(sFav) {
            if (sFav !== undefined) {
                //set default stytle
                for (var subscriber in subscribers) {
                    if (sFav.match(subscribers[subscriber].description)) {
                        subscribers[subscriber].subscribeStatus = true;
                        subscribers[subscriber].setStyle(true);
                    };
                };
            };
        };

        //set default stytle
        for (var subscriberStyle in subscribers) {
            subscribers[subscriberStyle].setStyle(subscribers[subscriberStyle].subscribeStatus);
        };

        var fnGetCurrentLists = function() {
            GetJourlistService.get(userID)
                .then(function(data) {
                    $scope.user.JourNo = data.length;

                    GetFavlistService.get(userID)
                        .then(function(data) {
                            $scope.user.favNo = data.length;
                            //$scope.user.NotificationNo = '0';
                            $scope.user.userUUID = $rootScope.userKey;
                            setUserfavorCategory($rootScope.favorCategory);

                        }, function(data) {
                            $ionicPopup.alert({
                                title: "获取收藏信息",
                                template: data
                            });
                        });

                }, function(data) {
                    alert(data);
                });
        };

        //setSubscribe Status via click
        $scope.setSubscribe = function(id) {
            if (subscribers[id].subscribeStatus) {
                subscribers[id].subscribeStatus = false;
                subscribers[id].setStyle(false);

            } else {
                subscribers[id].subscribeStatus = true;
                subscribers[id].setStyle(true);
            };
            //post favourate
            var subscribeTopics = [];
            for (var index in subscribers) {
                if (subscribers[index].subscribeStatus) {
                    subscribeTopics.push(subscribers[index].description);
                };
            };

            $rootScope.favorCategory = subscribeTopics.join();
            GetUserService.postfav($scope.user.userUUID, subscribeTopics.join());
        };

        //do refresh
        $scope.doRefresh = function() {
            fnGetCurrentLists();
            $scope.$broadcast('scroll.refreshComplete');
        };
        //get JourNo & Fav Info
        fnGetCurrentLists();

    }

    angular
        .module('app.profile')
        .controller('ProfileCtrl', ProfileCtrl);
})();
