/**
 * Favlist controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name FavCtrl
     * @module app.favlist
     * @description
     * Controller for the favlist page.
     *
     * @ngInject
     */
    function FavCtrl($scope, $stateParams, GetFavlistService, $rootScope, $state,$ionicSlideBoxDelegate,PassArtsListService) {
        var userID = $rootScope.user;
        $scope.ischoosed=0;
        // $scope.slideheight={
        //     height:(parseInt(window.screen.height)-92)+'px'
        // };

        // $scope.updateheight=function()
        // {
        //     $scope.slideheight={
        //     height:$scope.getMaxheight()+'px'
        //     };
        // };

        // $scope.getMaxheight=function()
        // {
        //     var max=parseInt(window.screen.height)-92;

        //     if($scope.ischoosed==0 && $scope.exhibitions && $scope.exhibitions.length*232-92>max)
        //     {
        //         max=$scope.exhibitions.length*232-92;
        //     }
        //     else if($scope.ischoosed==1 && $scope.arts && $scope.arts.length*232-92>max)
        //     {
        //         max=$scope.arts.length*232-92;
        //     }
        //     else if($scope.ischoosed==2 && $scope.gallerys&& $scope.gallerys.length*232-92 > max)
        //     {
        //         max=$scope.gallerys.length*232-92;
        //     }

        //     return max;
        // };

         $scope.iscurrentchoosed=function(number)
        {
            if ($scope.ischoosed==number) {
                return true;
            }
            return false;
        };

        $scope.slideHasChanged=function()
        {
            
            $scope.ischoosed=$ionicSlideBoxDelegate.currentIndex();
            $scope.fnGetFavList();
        };

        $scope.jumpto = function(index) {
            $ionicSlideBoxDelegate.slide(index);
        };

        $scope.fnGetFavList = function() {
            if($scope.ischoosed==0)
            {
                GetFavlistService.getExhibition(userID)
                .then(function(data) {
                    $scope.exhibitions = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicSlideBoxDelegate.update();
                }, function(data) {
                    alert(data);
                });
            }
            else if($scope.ischoosed==1)
            {
                GetFavlistService.getArt(userID)
                .then(function(data) {
                    $scope.arts = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicSlideBoxDelegate.update();
                }, function(data) {
                    alert(data);
                });
            }
            else if($scope.ischoosed==2)
            {
                GetFavlistService.getGallery(userID)
                .then(function(data) {
                    $scope.gallerys = data;
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicSlideBoxDelegate.update();
                }, function(data) {
                    alert(data);
                });
            }
        };

        $scope.doRefresh = function() {
            $scope.fnGetFavList();     
        };

        $scope.go_exhibition = function(state, Obeject) {
            $state.go(state, {
                'id': Obeject._id,
                'navigation': 'app.favlist'
            });
        };

        $scope.go_art = function(state, index) {
            var sliderData=[];
            for (var i = 0; i < $scope.arts.length ; i++) {
                sliderData.push($scope.arts[i].Art);
            };
            PassArtsListService.sendList(sliderData);
            $state.go(state, {
                'myindex': index,
                'navigation': 'app.favlist',
                'title':'搜索结果'
            });
        };

        $scope.go_gallery = function(state, Obeject) {
             $state.go(state, {
                '_name': Obeject.name,
                '_galleryIMG': Obeject.posterURL,
                '_gallerydesc': Obeject.description,
                '_gallerytitle': Obeject.name,
                '_nav': 'app.favlist'
            });
        };


        //init Data
        $scope.doRefresh();
    }

    angular
        .module('app.favlist')
        .controller('FavCtrl', FavCtrl);
})();
