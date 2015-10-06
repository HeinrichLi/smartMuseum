/**
 * Exhibition controller.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name ExhibitionCtrl
     * @module app.exhibition
     * @description
     * Controller for the exhibition page.
     *
     * @ngInject
     */

    function ExhibitionCtrl($scope, $http, MainService,$ionicSlideBoxDelegate, $window, $stateParams, $ionicPopup, AddFavService, RemoveFavService, MyFavInfoService, $state, $rootScope, ExhibitionService, $ionicModal, AddPlanService) {
        $scope.user = $rootScope.user;
         $scope.checked = false;

        //get Navigation from income page, if null back to main.
        $scope.navigation = $stateParams.navigation;

        if ($scope.navigation == "") {
            $scope.navigation = "app.tabs.main";
        };

        //CSS for Fav collect
        $scope.pre_collect = 'button icon-left ion-ios-star button-clear button-light';
        $scope.aft_collect = 'button icon-left ion-ios-star button-clear button-dark';

        $scope.goto = function(state, info) {
            $state.go(state, {
                'id': info.id,
                'subject': info.subject,
                'navigation': 'app.exhibition',
                'title': $scope.info.subject
            });

        }

        $scope.go = function() {

            if ($scope.navigation == 'app.exhibitions') {
                $state.go('app.exhibitions', {
                    '_name': $stateParams.name
                });

            } else if ($scope.navigation == 'app.tabs.main') {
                $state.go('app.tabs.main');
            } else if ($scope.navigation == 'app.search')
                $state.go('app.search');

        }


        $scope.items = [];
        $scope.checked = true;
        $scope.first = true;
        $scope.loadMore = function(state, info) {

                MainService.subscribeExhibitions($rootScope.favorCategory, "''", 0, 5, function(params) {
                        for (var i = 0; i <= 2 ; i++) {

                            var oStatus = {};

                            //oStatus = fnConvert(params[i].startDate, params[i].endDate);

                            params[i].ExhiStatus = oStatus.status;
                            params[i].index = oStatus.index;
                        }
                        $scope.goto(state, info);

                        $rootScope.subexhibitions = params;
                        /* setTimeout(function() {
                        $scope.goto(state, info);
                         }, 1500);*/

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    }


                )

        };



        ExhibitionService.exhibition($stateParams.id)
            .then(function(data) {
                $scope.exhibition = data;
                // convert format of date change - to .
                var str1 = $scope.exhibition.value[0].startDate;
                var str2 = $scope.exhibition.value[0].endDate;
                $scope.date1 = str1.replace(/\-/g, "\.");
                $scope.date2 = str2.replace(/\-/g, "\.");
                $scope.info = $scope.exhibition.value[0];

                //for Fav collect
                var index = 0;
                MyFavInfoService.myfav_ex($rootScope.user, $scope.info.id, function(data1, index) {
                    if (data1.value.length) {
                        $scope.Fav = $scope.aft_collect;
                    } else {
                        $scope.Fav = $scope.pre_collect;
                    }
                }, 0)


            }, function(data) {
                alert(data);
            });

        // $rootScope.navigation = 'app.exhibition';
        //code for planning
        $scope.myModal = {
            addCalendar: false,
            planDate: new Date()
        };

        $ionicModal.fromTemplateUrl("js/routes/exhibition/plan.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.postData = function() {
            AddPlanService.post($rootScope.user, $scope.myModal.planDate, $stateParams.id);
            if ($scope.myModal.addCalendar === true) {

                AddPlanService.addPhone($scope.myModal.planDate, $scope.exhibition.value[0].address, $scope.exhibition.value[0].subject);

            }


        };

        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.addPlan = function() {
            $scope.postData();
            $scope.modal.hide();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
            $scope.modalpic.hide();
        };

        // when click Fav star
        // when click  collect star
        $scope.dofav = function(info) {

            if (!$rootScope.user) {
                $ionicPopup.alert({
                    title: "提醒!",
                    template: "请先登录"
                });
            } else {

                if ($scope.Fav == $scope.pre_collect) {
                    AddFavService.post_exhibition($rootScope.user, info.id)
                        .then(function(data) {
                            $scope.exid = data.id;
                            $scope.Fav = $scope.aft_collect;
                        }, function(data) {
                            alert(data);
                        });

                } else {
                    var index = 0;
                    MyFavInfoService.myfav_ex($rootScope.user, info.id, function(data1, index) {
                        if (data1.value.length) {
                            $scope.exid = data1.value[0].id;

                            RemoveFavService.remove_exhibition($scope.exid)
                                .then(function(data) {
                                    $scope.Fav = $scope.pre_collect;
                                }, function(data) {
                                    alert(data);
                                });
                        }
                    }, 0);

                }
            }
        };

    // when click pic to open tranparent model

      $ionicModal.fromTemplateUrl('js/routes/exhibition/picbox.html', {
            scope: $scope,
        animation: 'slide-in-down'
       }).then(function(modal) {
             $scope.modalpic = modal;
       });

    

      $scope.openpic = function(index){
         $ionicSlideBoxDelegate.slide(1);
         $scope.modalpic.show();
         $scope.url = $scope.exhibition.value[0].Scene[index].url;
         $scope.modalHeight =  $window.innerHeight + 'px';
         $scope.modalWidth  =  $window.innerWidth + 'px';
      };



    }




    angular
        .module('app.exhibition')
        .controller('ExhibitionCtrl', ExhibitionCtrl);
})();


