/**
 * Layout controller.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name LayoutCtrl
     * @module app.layout
     * @requires $state
     * @requires
     * @description
     * Controller for the layout page.
     *
     * @ngInject
     */
    function AppCtrl($scope, $ionicModal, $timeout, $state, LoginService, MainService, $rootScope, $ionicPopup) {

        $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
            console.log('Ionic Push: Got token ', data.token, data.platform);
            $rootScope.myToken = data.token;
            LoginService.updateToken($rootScope.userKey, $rootScope.myToken);
            //save the token to database
        });

        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {   
            console.log('receive notification');   
            if (notification.id)       $state.go("app.exhibition", {         
                id: notification.id,
                         navigation: "app.tabs.exhibitions"       
            }); 
        });

        // Form data for the login modal
        $scope.loginData = {};

        $scope.outFlag = 'true';
        $scope.inFlag = 'false';

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('js/routes/layout/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.formMessage = "forgetPassword";
            $scope.state = 'false';
            $scope.title = '登陆';
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
            //check login or register
            if ($scope.state === 'false') // login
            {
                LoginService.login($scope.loginData.username, $scope.loginData.password)
                    .then(function(data) {
                        if (data.value.length > 0) {
                            $rootScope.user = data.value[0].user;
                            $rootScope.userName = data.value[0].name;
                            $rootScope.favorCategory = data.value[0].favorCategory;
                            $rootScope.userKey = data.value[0].id;
                            window.userKey = data.value[0].user;
                            $scope.outFlag = 'false';
                            $scope.inFlag = 'true';
                            $scope.closeLogin();
                            LoginService.identifyUser($scope.loginData.username);

                            if ($rootScope.favorCategory != null) {

                                MainService.subscribeRefresh($rootScope.favorCategory, "''", 0, 5, function(data) {

                                    for (var i = 0; i <= data.length - 1; i++) {

                                        var oStatus = {};

                                        oStatus = fnConvert(data[i].startDate, data[i].endDate);

                                        data[i].ExhiStatus = oStatus.status;
                                        data[i].index = oStatus.index;

                                    };
                                    //然后绑定到$scope
                                    $rootScope.subexhibitions = data;
                                })
                            };

                            $rootScope.$broadcast('refreshGalleries', 'true');

                        } else {
                            $ionicPopup.alert({
                                template: "登录失败"
                            });


                        }

                    }, function(data) {
                        $scope.loginData.fail = data;
                    });
            } else //register
            {
                if ($scope.loginData.password !== $scope.loginData.confirm) {
                    $ionicPopup.alert({

                        template: "请保持密码输入一致"
                    });
                } else {
                    LoginService.checkID($scope.loginData.username)
                        .then(function(data) {
                            if (data.value.length > 0) {
                                $ionicPopup.alert({

                                    template: "用户名已经存在"
                                });

                            } else {

                                LoginService.post($scope.loginData.username, $scope.loginData.nickname, $scope.loginData.password)
                                    .then(function(data) {
                                        LoginService.login($scope.loginData.username, $scope.loginData.password)
                                            .then(function(data) {
                                                if (data.value.length > 0) {
                                                    $rootScope.favorCategory = data.value[0].favorCategory;
                                                    $rootScope.userKey = data.value[0].id;
                                                    window.userKey = data.value[0].user;
                                                    LoginService.identifyUser();
                                                    
                                                    if ($rootScope.favorCategory != null) {

                                                        MainService.subscribeRefresh($rootScope.favorCategory, "''", 0, 5, function(data) {

                                                            for (var i = 0; i <= data.length - 1; i++) {

                                                                var oStatus = {};

                                                                oStatus = fnConvert(data[i].startDate, data[i].endDate);

                                                                data[i].ExhiStatus = oStatus.status;
                                                                data[i].index = oStatus.index;

                                                            };
                                                            //然后绑定到$scope
                                                            $rootScope.subexhibitions = data;
                                                        })
                                                    }

                                                }
                                            }, function(data) {});

                                    });
                                $rootScope.user = $scope.loginData.username;
                                $rootScope.userName = $scope.loginData.nickname;

                                $scope.outFlag = 'false';
                                $scope.inFlag = 'true';
                                $scope.closeLogin();

                            }

                        }, function(data) {

                        });


                }
            }

        };

        $scope.logout = function() {
            $scope.outFlag = 'true';
            $scope.inFlag = 'false';

            $rootScope.user = '';
            $rootScope.userName = '';
            $rootScope.favorCategory = '';
            $scope.loginData.username = '';
            $scope.loginData.nickname = '';
            $scope.loginData.password = '';
            $scope.loginData.confirm = '';
            $scope.subexhibitions = '';

            window.userKey = '';
        }

        // Open the login modal
        $scope.register = function() {
            $scope.formMessage = "noDisplay";
            $scope.state = 'true';
            $scope.title = '注册';
            $scope.modal.show();
        };
        $scope.checkSomething = function() {
            if ($scope.state === 'true') {
                return true;
            } else {
                return false;
            }
        };

        $scope.myShow = function() {
            if ($scope.outFlag === 'true') {
                return true;
            } else {
                return false;
            }

        };
        $scope.myInfo = function() {
            if ($scope.inFlag === 'true') {
                return true;
            } else {
                return false;
            }

        };

        var fnConvert = function(sStartDate, sEndDate) {

            // var _currentDate = new Date();
            // var _startDate = new Date("2009-02-03");
            // var _endDate = new Date("2016-02-03");

            var _sCurrentDate = new Date();
            var _sStartDate = new Date(sStartDate);
            var _sEndDate = new Date(sEndDate);
            var oStatus = {};

            if (_sCurrentDate >= _sStartDate && _sCurrentDate <= _sEndDate) {
                oStatus.status = '展览中...';
                oStatus.index = 1;
            } else if (_sCurrentDate > _sEndDate) {
                oStatus.status = '展览已结束...';
                oStatus.index = 3;
            } else if (_sCurrentDate < _sStartDate) {
                oStatus.status = '展览未开始...';
                oStatus.index = 2;
            };
            return oStatus;
        }
    }

    angular
        .module('app.layout')
        .controller('AppCtrl', AppCtrl);
})();
