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
    function GridCtrl($scope, $state, $rootScope, $stateParams, PassArtsListService, RefreshService) {

       var arts = new Array();


        console.log("entered!");
        $scope.navigation = $stateParams.navigation;
        console.log( $stateParams.navigation );


      //get passed in data
        arts = PassArtsListService.getList();

        if ($stateParams.id != undefined)
        {
            $scope.mytitle = $stateParams.title;
        }

        if ($stateParams.from === 'app.tabs.paints')
           {

             $scope.noMoreItemsAvailable = false;

            }
        else {
          $scope.arts = arts;
          $scope.noMoreItemsAvailable = true;
            console.log('passin atrs' + $scope.arts.length);
        }

        function doRefresh() {
          if (arts.length > 15)
          { $scope.arts = arts;
              console.log('passin atrs' + $scope.arts.length);
            return; }
            var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=15&$skip=';
            var message = '下拉刷新，获取作品信息失败!';
            url = url + arts.length;
            RefreshService.get(url, message)
                .then(function(data) {
                  $scope.arts = new Array();
                  for (var i = 0; i <= data.value.length-1; i++) {
                      $scope.arts.push(data.value[i].Art);
                  }
                  console.log('requested atrs' + $scope.arts.length);

                });



        }


        $scope.loadMore = function(NumOfArtToload) {

            // var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=';

                if ($scope.arts == undefined)
                {doRefresh();
                  console.log("first time load more");
                  $scope.$broadcast('scroll.infiniteScrollComplete');
                  return;}
                var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=';
                var dataLength = $scope.arts.length + NumOfArtToload;
                var message = '上拉加载，获取作品信息失败!';
                if($stateParams.cate === '')
                {
                  url = url + dataLength;
                }
                else{
                  url = url + dataLength + '&$filter=Art.cateName eq ' + "'" + $stateParams.cate + "'";
                }
                console.log(url);
                if ($scope.arts) {
                RefreshService.get(url, message)
                    .then(function(data) {
                      var sliderData = new Array();
                      if ( data.value.length === $scope.arts.length)
                      { $scope.noMoreItemsAvailable = true;
                      console.log('reset flag');}
                      for (var i = 0; i <= data.value.length-1; i++) {
                          sliderData.push(data.value[i].Art);
                      }
                        $scope.arts = sliderData;
                        console.log('load more arts ' + $scope.arts.length );

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });}
                    else {
                      {$scope.$broadcast('scroll.infiniteScrollComplete');}
                    }


        }




        $scope.goslide = function(myIndex){
          PassArtsListService.sendList($scope.arts);
          console.log("index is "+myIndex);
          $state.go( 'app.slidepaints',
        {
          'myindex': myIndex,
          'navigation': $stateParams.from,
          'title' : $stateParams.title,
          'id' : $stateParams.id,
          'cate': $stateParams.cate
        });
        }

        $scope.goback = function(){
          PassArtsListService.sendList($scope.arts);
          $state.go($stateParams.navigation,{
            'navigation': $stateParams.from,
            'myindex': $stateParams.myindex,
            'title' : $stateParams.title,
            'id' : $stateParams.id,
            'cate': $stateParams.cate
          });

        };



    }

    angular
        .module('app.slidegrid')
        .controller('GridCtrl', GridCtrl);
})();
