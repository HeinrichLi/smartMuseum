/**
 * Gallery controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name iBeaconsCtrl
     * @module app.ibeacons
     * @description
     * Controller for the ibeacons page.
     *
     * @ngInject
     */
    function iBeaconsCtrl($scope, $state, $rootScope, $stateParams,$ionicSlideBoxDelegate,iBeaconsService,PassArtsListService) {
        

        var PagePhotoAmount=4;
        $scope.Small_Photo_Width=parseInt(window.screen.width/PagePhotoAmount);
        $scope.currentPhoto=0;
        $scope.smallpictureslider={transform: 'translate3d(0px, 0px, 0px)'};
        $scope.smallpictureswidth={width:$scope.Small_Photo_Width+'px'};
        $scope.bigpictureheight={height:parseInt(window.screen.height*3/4)+'px'};
        $scope.photos=[];

        iBeaconsService.filter($stateParams.minor).then(function(response){
            $scope.photos=response.value[0].Art;
            $ionicSlideBoxDelegate.update();
            $scope.updateSmallphotoPosition();
        });



        $scope.updateSmallphotoPosition = function(){
            if(1<=$ionicSlideBoxDelegate.currentIndex() && $ionicSlideBoxDelegate.currentIndex() < $ionicSlideBoxDelegate.slidesCount()- PagePhotoAmount + 1){
            var temp= - $scope.Small_Photo_Width * ( $ionicSlideBoxDelegate.currentIndex()-1 ) ;
            temp = temp +'px';
            $scope.smallpictureslider={transform: 'translate3d('+temp+', 0px, 0px)'};
            }
            else if (($ionicSlideBoxDelegate.currentIndex() >= $ionicSlideBoxDelegate.slidesCount()- PagePhotoAmount + 1)
            &&($ionicSlideBoxDelegate.slidesCount()- PagePhotoAmount + 1>0))
            {
            var temp= - $scope.Small_Photo_Width * ($ionicSlideBoxDelegate.slidesCount()- PagePhotoAmount);
            temp = temp +'px';
            $scope.smallpictureslider={transform: 'translate3d('+temp+', 0px, 0px)'};
            }
            else if ($ionicSlideBoxDelegate.currentIndex() <1) {
            $scope.smallpictureslider={transform: 'translate3d(0px, 0px, 0px)'};
            };
        };

        $scope.jumpto = function(index) {
            $ionicSlideBoxDelegate.slide(index);
            $scope.currentPhoto=index;
            $scope.updateSmallphotoPosition();
        };

        $scope.isActive=function(index){
            return $scope.currentPhoto===index;
        };

        $scope.slideHasChanged =function(){
            $scope.currentPhoto=$ionicSlideBoxDelegate.currentIndex();
            $scope.updateSmallphotoPosition();
        };

        $scope.isFirst = function(){
            if ($scope.currentPhoto < 1) {
            return true;
            };
            return false;
        };

        $scope.isLast = function(){
            if ($scope.currentPhoto > $ionicSlideBoxDelegate.slidesCount()-PagePhotoAmount) {
            return true;
            };
            return false;
        };

        $scope.go_home=function(){
            if ($stateParams.navigation=="") {
                $state.go('app.tabs.main', {});
            }else
            {
                $state.go($stateParams.navigation, {});
            }
            
        };

        $scope.go_art = function(state, index) {
            PassArtsListService.sendList($scope.photos);
            $state.go(state, {
                'myindex': index,
                'navigation': 'app.ibeacons'
            });
        };
    }

    angular
        .module('app.ibeacons')
        .controller('iBeaconsCtrl', iBeaconsCtrl);
})();
