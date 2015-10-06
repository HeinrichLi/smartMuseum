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
    function PaintsCtrl($scope, $state, $rootScope, $stateParams, $ionicPopup, ArtsService, RefreshService, PassArtsListService) {
        $scope.go = function(state, myindex) {
            var temp = new Array();
            temp = ArtsService.slideArts($scope);

            PassArtsListService.sendList(temp);
            $state.go(state, {
                'myindex': myindex,
                'navigation': 'app.tabs.paints',
                'cate': $scope.cate
            });
        };

    
        $scope.dofilter = function(category){

            $scope.cate = category;

            switch(category){
                case "国画-山水画":            
                    ArtsService.filter($scope, $stateParams, "'国画-山水画'", 'button1')
                    .then(function(data) {
                       $scope.arts = data;
                        //Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });                            
                    break;                        
                    
                case "国画-人物画":
                    ArtsService.filter($scope, $stateParams, "'国画-人物画'", 'button2')
                    .then(function(data) {
                       $scope.arts = data;
                        //Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });                            
                    break;                     
                 case "油画":
                    ArtsService.filter($scope, $stateParams, "'油画'", 'button3')
                    .then(function(data) {
                       $scope.arts = data;
                        //Stop the ion-refresher from spinning
                        $scope.$broadcast('scroll.refreshComplete');
                    });                            
                    break;                    
            };

        };



        if ($stateParams.cate == "null" || $stateParams.cate == "") {
            ArtsService.arts()
                .then(function(data) {
                    $scope.arts = data;

                }, function(data) {
                    alert(data);
                });   
        } else{
           $scope.dofilter($stateParams.cate);
        };


        if ($stateParams.id != "null") {
            $scope.query = $stateParams.subject;
        }


        $scope.noMoreItemsAvailable = false;

        $scope.doRefresh = function() {
            var url;
            if($scope.cate == null){                
                url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=';
                url = url + $scope.arts.value.length;
            }else{
                url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=';
                url = url + $scope.arts.value.length + '&$filter=Art.cateName eq ' + "'" + $scope.cate + "'";
                 
            };
            
            var message = '下拉刷新，获取作品信息失败!';
            
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
                var url;
                var dataLength = $scope.arts.value.length + NumOfArtToload
                if($scope.cate == null){
                    url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip='
                    url = url + dataLength;                               
                }else{
                    url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip='
                    url = url + dataLength + '&$filter=Art.cateName eq ' + "'" + $scope.cate + "'";
               
                }
                 
                var message = '上拉加载，获取作品信息失败!';                
                RefreshService.get(url, message)
                    .then(function(data) {                        
                        for (var i = 0; i < data.value.length; i++) {
                            $scope.arts.value.push(data.value[i]);
                        };
                    });
                $scope.$broadcast('scroll.infiniteScrollComplete');

            } else {

                $scope.$broadcast('scroll.infiniteScrollComplete');

            }

        }


    }
    

    angular
        .module('app.arts')
        .controller('PaintsCtrl', PaintsCtrl);
})();
