/**
 * Arts controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name ArtsCtrl
     * @module app.arts
     * @description
     * Controller for the arts page.
     *
     * @ngInject
     */
    function ArsCtrl($scope, $state, $rootScope, $stateParams, ArtsService, RefreshService) {
        $scope.go = function(state, paint, subject) {
            $state.go(state, {
                'ex_id': '',
                'pa_id': paint._id,
                'subject': subject,
                'navigation': 'app.tabs.paints'
            });
        };


        ArtsService.arts()
            .then(function(data) {
                $scope.arts = data;
            }, function(data) {
                alert(data);
            });

        if ($stateParams.id != "null") {
            $scope.query = $stateParams.subject;
        }

        $scope.noMoreItemsAvailable = false;

        $scope.doRefresh = function() {
            var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=';
            var message = '下拉刷新，获取作品信息失败!';
            url = url + $scope.arts.value.length;
            RefreshService.get(url, message)
                .then(function(data) {
                    $scope.paint = data;
                    //Stop the ion-refresher from spinning
                    for (var i = 0; i < data.value.length; i++) {
                        $scope.arts.value.push(data.value[i]);
                    };
                    $scope.$broadcast('scroll.refreshComplete');
                });

        }

        $scope.loadMore = function(NumOfArtToload) {

            // var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=';

            if ($scope.arts) {

                var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=';
                var dataLength = $scope.arts.value.length + NumOfArtToload
                var message = '上拉加载，获取作品信息失败!';
                url = url + dataLength;
                RefreshService.get(url, message)
                    .then(function(data) {
                        $scope.arts = data;
                    });
                $scope.$broadcast('scroll.infiniteScrollComplete');

            } else {

                $scope.$broadcast('scroll.infiniteScrollComplete');

            }

        }


    }

    angular
        .module('app.arts')
        .controller('ArsCtrl', ArsCtrl);
})();
