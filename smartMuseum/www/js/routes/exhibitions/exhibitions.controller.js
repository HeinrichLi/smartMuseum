/**
 * Exhibitions controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name ExhibitionsCtrl
     * @module app.exhibitions
     * @description
     * Controller for the exhibitions page.
     *
     * @ngInject
     */
    function ExhibitionsCtrl($scope, $state, $ionicModal, $rootScope, ExhibitionsService,
        EX_BASE_URL, RefreshService, GalleriesService, GA_BASE_URL, $timeout, $stateParams) {
        var s_name = $stateParams._name;
        $scope._nav = $stateParams._nav;

        $scope.doRefresh = function() {
            var url = '';
            var params = '$top=' + $scope.exhibitions.value.length + '&$filter=vanue eq ' + "'" + s_name + "'" + "&$orderby=startDate desc";
            var message = '';
            url = EX_BASE_URL.url + params;
            RefreshService.get(url, message).then(function(items) {

                for (var i = 0; i <= items.value.length - 1; i++) {
                    var oStatus = {};
                    oStatus = fnConvert(items.value[i].startDate, items.value[i].endDate);
                    items.value[i].ExhiStatus = oStatus.status
                    items.value[i].index = oStatus.index;
                };

                $scope.exhibitions.value = items.value;
                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        $scope.checked = true;
        $scope.load_more = function() {
            if ($scope.exhibitions == null) {
                var url = EX_BASE_URL.url + '&$top=5' + '&$filter=vanue eq ' + "'" + s_name + "'" + "&$orderby=startDate desc";

                ExhibitionsService.get(url, function(params) {

                    for (var i = 0; i <= params.value.length - 1; i++) {
                        var oStatus = {};
                        oStatus = fnConvert(params.value[i].startDate, params.value[i].endDate);
                        params.value[i].ExhiStatus = oStatus.status
                        params.value[i].index = oStatus.index;

                    };

                    //然后绑定到$scope 
                    $scope.exhibitions = params;
                    //Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

            } else {
                var url = '';
                var params = '&$skip=' + $scope.exhibitions.value.length;
                var message = '';
                url = EX_BASE_URL.url + '$top=5' + params + '&$filter=vanue eq ' + "'" + s_name + "'" + "&$orderby=startDate desc";
                RefreshService.loadMore(url, message, function(items) {

                    for (var i = 0; i <= items.value.length - 1; i++) {
                        var oStatus = {};
                        oStatus = fnConvert(items.value[i].startDate, items.value[i].endDate);
                        items.value[i].ExhiStatus = oStatus.status
                        items.value[i].index = oStatus.index;

                    };

                    //然后绑定到$scope 
                    $scope.exhibitions.value = $scope.exhibitions.value.concat(items.value);

                    $scope.$broadcast('scroll.infiniteScrollComplete');

                    if (items.value.length == 0) {
                        $scope.checked = false;
                    } else {
                        $scope.checked = true;
                    };

                });
            };
        };

        $scope.go = function(state, exhibition) {
            $state.go(state, {
                'id': exhibition.id,
                'name': $stateParams._name,
                'navigation': 'app.exhibitions'
            });
        }

        $scope.back = function(){
            if($stateParams._nav == ""){
                 $state.go("app.tabs.galleries");
            }else{
                $state.go($stateParams._nav);
            }
        }

        var fnConvert = function(sStartDate, sEndDate) {
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
        .module('app.exhibitions')
        .controller('ExhibitionsCtrl', ExhibitionsCtrl);
})();
