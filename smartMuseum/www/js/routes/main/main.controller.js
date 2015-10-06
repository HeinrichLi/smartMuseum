/**
 * main controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name MainCtrl
     * @module app.main
     * @description
     * Controller for the main page.
     *
     * @ngInject
     */
    function MainCtrl($scope, MainService, $state, $rootScope, $ionicModal, $ionicPopup) {

        // var aCity = new Array();
        // aCity.push('全国');

        // $scope.aCitys = [{
        //     text: "全国",
        //     checked: true
        // }, {
        //     text: "北京",
        //     checked: false
        // }, {
        //     text: "上海",
        //     checked: false
        // }, {
        //     text: "广州",
        //     checked: false
        // }, {
        //     text: "成都",
        //     checked: false
        // }];

        $scope.items = ["全国", "北京", "上海", "广州", "成都"];

        $scope.ret = {
            choice: "全国"
        };

        // $scope.display = "北京";
        // up pull refresh function
        $scope.doRefresh = function() {

            // var city = "''";
            // var index = -1;

            // index = findIndex("全国", aCity);

            // if (index > -1) {
            //     city = "''";
            // } else {
            //     if (aCity.length > 0) {
            //         city = aCity.toString();
            //     };
            // };

            var city = "''";

            if ($scope.ret.choice != "全国") {
                city = $scope.ret.choice;
            }

            MainService.subscribeRefresh($rootScope.favorCategory, city, 0, $rootScope.subexhibitions.length, function(data) {

                for (var i = 0; i <= data.length - 1; i++) {

                    var oStatus = {};

                    oStatus = fnConvert(data[i].startDate, data[i].endDate);

                    data[i].ExhiStatus = oStatus.status;
                    data[i].index = oStatus.index;

                };
                //然后绑定到$scope 
                $rootScope.subexhibitions = data;
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            })
        };
        // city filter with modal way 
        $ionicModal.fromTemplateUrl('js/routes/main/city.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.close = function() {
                $scope.modal.hide();
            }
            // $scope.fChange = function(item) {
            //     var index = -1;

        //     if (item.checked) {
        //         aCity.push(item.text);
        //     } else {
        //         index = findIndex(item.text, aCity);
        //         if (index > -1) {
        //             aCity.splice(index, 1);
        //         };
        //     }

        //     index = -1;

        //     index = findIndex("全国", aCity);

        //     if (index > -1 && aCity.length > 1) {

        //         $ionicPopup.alert({
        //                 title: "注意",
        //                 template: "全国与城市不能同时选择！"
        //             })
        //             .then(function(res) {
        //                 $scope.disable = true;
        //             });

        //     } else {
        //         $scope.disable = false;
        //     }

        //     console.log('City Change');
        // };
        $scope.doSubmit = function() {

            // var city = "''";
            // var skip = 0;
            // var limit = 0;

            // var index = -1;

            // index = findIndex("全国", aCity);

            // if (index > -1) {
            //     city = "''";
            // } else {
            //     if (aCity.length > 0) {
            //         city = aCity.toString();
            //     };
            // };

            var city = "''";
            var skip = 0;
            var limit = 5;

            if ($scope.ret.choice != "全国") {
                city = $scope.ret.choice;
            }

            MainService.filterExhibitions($rootScope.favorCategory, city, 0, 5, function(data) {

                for (var i = 0; i <= data.length - 1; i++) {
                    var oStatus = {};

                    oStatus = fnConvert(data[i].startDate, data[i].endDate);

                    data[i].ExhiStatus = oStatus.status;
                    data[i].index = oStatus.index;

                };

                $rootScope.subexhibitions = data;
            });

            $scope.checked = true;

            $scope.modal.hide();
        };

        $scope.checked = true;

        $scope.load_more = function() {
            if ($rootScope.subexhibitions == null) {

                MainService.subscribeExhibitions($rootScope.favorCategory, "''", 0, 5, function(params) {

                    for (var i = 0; i <= params.length - 1; i++) {

                        var oStatus = {};

                        oStatus = fnConvert(params[i].startDate, params[i].endDate);

                        params[i].ExhiStatus = oStatus.status;
                        params[i].index = oStatus.index;

                    };

                    //然后绑定到$scope 
                    $rootScope.subexhibitions = params;
                    //Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })

            } else {

                // var city = "''";
                // var skip = 0;
                // var limit = 0;

                // var index = -1;

                // index = findIndex("全国", aCity);

                // if (index > -1) {
                //     city = "''";
                // } else {
                //     if (aCity.length > 0) {
                //         city = aCity.toString();
                //     };
                // };

                var city = "''";

                if ($scope.ret.choice != "全国") {
                    city = $scope.ret.choice;
                }

                MainService.subscribeExhibitions($rootScope.favorCategory, city, $rootScope.subexhibitions.length, 5, function(params) {

                    for (var i = 0; i <= params.length - 1; i++) {
                        var oStatus = {};

                        oStatus = fnConvert(params[i].startDate, params[i].endDate);

                        params[i].ExhiStatus = oStatus.status;
                        params[i].index = oStatus.index;

                    };

                    $rootScope.subexhibitions = $rootScope.subexhibitions.concat(params);


                    if (params.length == 0) {
                        $scope.checked = false;
                    } else {
                        $scope.checked = true;
                    };

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
            };
        };

        $scope.go = function(state, exhibition) {
            $state.go(state, {
                'id': exhibition._id,
                'navigation': 'app.tabs.main'
            });
        }

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

        var findIndex = function(text, aCitys) {
            var index = -1;
            for (var i = 0; i <= aCitys.length - 1; i++) {
                if (text === aCitys[i]) {
                    index = i;
                };
            }
            return index;
        }

    }
    angular
        .module('app.main')
        .controller('MainCtrl', MainCtrl);
})();
