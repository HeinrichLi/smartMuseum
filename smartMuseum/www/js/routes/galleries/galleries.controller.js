/**
 * Galleries controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name GalleriesCtrl
     * @module app.galleries
     * @description
     * Controller for the galleries page.
     *
     * @ngInject
     */
    function GalleriesCtrl($scope, $rootScope, $ionicPopup, AddFavService, RemoveFavService, MyFavInfoService, $state, GalleriesService, ExhibitionsService, GA_BASE_URL, $ionicModal, RefreshService, EX_BASE_URL) {
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

        //CSS style of favorite Star 
        $scope.pre_collect = 'button icon-left ion-ios-star button-clear button-light';
        $scope.aft_collect = 'button icon-left ion-ios-star button-clear button-dark';

        $scope.$on('refreshGalleries', function(event, flag) {

            if (flag) {
                $scope.doRefresh();
            }
        });

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

            GalleriesService.filter(city, 0, $scope.galleries.length, function(data) {

                for (var i = 0; i <= data.length - 1; i++) {
                    var s_name = data[i].name;
                    var url = EX_BASE_URL.url + '$filter=vanue eq ' + "'" + s_name + "'";

                    ExhibitionsService.get(url, function(params, index) {

                        data[index].total = params.value.length;

                        var _sCurrentDate = new Date();

                        var amout = 0;

                        for (var j = 0; j <= params.value.length - 1; j++) {
                            var _sStartDate = new Date(params.value[j].startDate);
                            var _sEndDate = new Date(params.value[j].endDate);

                            if (_sCurrentDate >= _sStartDate && _sCurrentDate <= _sEndDate) {
                                amout = amout + 1;
                            }
                        }

                        data[index].ing = amout;
                    }, i);



                    // Add field fav to Galleries
                    MyFavInfoService.myfav_ga($rootScope.user, data[i]._id, function(data1, index) {
                        if (data1.value.length) {
                            data[index].fav = $scope.aft_collect;
                        } else {
                            data[index].fav = $scope.pre_collect;
                        }
                    }, i)
                };

                $scope.galleries = data;

                $scope.$broadcast('scroll.refreshComplete');
            });

        };
        // city filter with modal way 
        $ionicModal.fromTemplateUrl('js/routes/galleries/city.html', {
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
        //     };

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
            // var limit = 5;

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

            GalleriesService.filter(city, skip, limit, function(data) {
                $scope.galleries = data;
            });

            $scope.checked = true;

            $scope.galleries = null;

            $scope.modal.hide();
        };
        //down pull load more function
        $scope.checked = true;
        $scope.load_more = function() {
            if ($scope.galleries == null) {

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

                GalleriesService.filter(city, 0, 5, function(data) {

                    for (var i = 0; i <= data.length - 1; i++) {
                        var s_name = data[i].name;
                        var url = EX_BASE_URL.url + '$filter=vanue eq ' + "'" + s_name + "'";

                        ExhibitionsService.get(url, function(params, index) {

                            data[index].total = params.value.length;

                            var _sCurrentDate = new Date();

                            var amout = 0;

                            for (var j = 0; j <= params.value.length - 1; j++) {
                                var _sStartDate = new Date(params.value[j].startDate);
                                var _sEndDate = new Date(params.value[j].endDate);

                                if (_sCurrentDate >= _sStartDate && _sCurrentDate <= _sEndDate) {
                                    amout = amout + 1;
                                }
                            }

                            data[index].ing = amout;

                        }, i);

                        // Add field fav to Galleries
                        MyFavInfoService.myfav_ga($rootScope.user, data[i]._id, function(data1, index) {
                            if (data1.value.length) {
                                data[index].fav = $scope.aft_collect;
                            } else {
                                data[index].fav = $scope.pre_collect;
                            }
                        }, i)
                    };

                    $scope.galleries = data;

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });

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

                GalleriesService.filter(city, $scope.galleries.length, 5, function(data) {

                    for (var i = 0; i <= data.length - 1; i++) {
                        var s_name = data[i].name;
                        var url = EX_BASE_URL.url + '$filter=vanue eq ' + "'" + s_name + "'";

                        ExhibitionsService.get(url, function(params, index) {

                            data[index].total = params.value.length;

                            var _sCurrentDate = new Date();

                            var amout = 0;

                            for (var j = 0; j <= params.value.length - 1; j++) {
                                var _sStartDate = new Date(params.value[j].startDate);
                                var _sEndDate = new Date(params.value[j].endDate);

                                if (_sCurrentDate >= _sStartDate && _sCurrentDate <= _sEndDate) {
                                    amout = amout + 1;
                                }
                            }

                            data[index].ing = amout;

                            //Stop the ion-refresher from spinning
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }, i);
                    };

                    // $scope.galleries = data;

                    $scope.galleries = $scope.galleries.concat(data);

                    $scope.$broadcast('scroll.infiniteScrollComplete');

                    if (data.length == 0) {
                        $scope.checked = false;
                    } else {
                        $scope.checked = true;
                    };
                });
            };
        };

        $scope.go = function(state, gallery) {
            $state.go(state, {
                '_name': gallery.name,
                '_galleryID': gallery._id,
                '_galleryIMG': gallery.posterURL,
                '_gallerydesc': gallery.description,
                '_gallerytitle': gallery.name
                // '_nav': 'app.tabs.galleries'
            });
        }


        //For favorite Star 
        $scope.pre_collect = 'button icon-left ion-ios-star button-clear button-light';
        $scope.aft_collect = 'button icon-left ion-ios-star button-clear button-dark';

        // when click  collect star
        $scope.dofav = function(gallery) {

            if (!$rootScope.user) {
                $ionicPopup.alert({
                    title: "提醒!",
                    template: "请先登录"
                });
            } else {

                if (gallery.fav == $scope.pre_collect) {
                    AddFavService.post_gallery($rootScope.user, gallery._id)
                        .then(function(data) {
                            $scope.gaid = data.id;
                            gallery.fav = $scope.aft_collect;
                        }, function(data) {
                            alert(data);
                        });

                } else {
                    var index = 0;
                    MyFavInfoService.myfav_ga($rootScope.user, gallery._id, function(data1, index) {
                        if (data1.value.length) {
                            $scope.gaid = data1.value[0].id;

                            RemoveFavService.remove_gallery($scope.gaid)
                                .then(function(data) {
                                    gallery.fav = $scope.pre_collect;
                                }, function(data) {
                                    alert(data);
                                });
                        }
                    }, 0);

                }
            }
        };





    };

    function InformationCtrl($scope, $rootScope, $http, $stateParams, $state, $ionicPopup, AddFavService, RemoveFavService, MyFavInfoService) {
        $scope.galleryIMG = $stateParams._galleryIMG;
        $scope.galleryID = $stateParams._galleryID;
        $scope.gallerydesc = $stateParams._gallerydesc;
        $scope.gallerytitle = $stateParams._gallerytitle;
        $scope.goall = function() {
            $state.go('app.tabs.galleries', {
                '_nav': 'app.tabs.galleries'
            });
        }

        //For favorite Star 
        $scope.pre_collect = 'button icon-left ion-ios-star button-clear button-light';
        $scope.aft_collect = 'button icon-left ion-ios-star button-clear button-dark';

        var index = 0;
        MyFavInfoService.myfav_ga($rootScope.user, $scope.galleryID, function(data1, index) {
            if (data1.value.length) {
                $scope.Fav = $scope.aft_collect;
            } else {
                $scope.Fav = $scope.pre_collect;
            }
        }, 0);

        // when click  collect star
        $scope.dofav = function(info) {

            if (!$rootScope.user) {
                $ionicPopup.alert({
                    title: "提醒!",
                    template: "请先登录"
                });
            } else {

                if ($scope.Fav == $scope.pre_collect) {
                    AddFavService.post_gallery($rootScope.user, $scope.galleryID)
                        .then(function(data) {
                            $scope.exid = data.id;
                            $scope.Fav = $scope.aft_collect;
                        }, function(data) {
                            alert(data);
                        });

                } else {
                    var index = 0;
                    MyFavInfoService.myfav_ga($rootScope.user, $scope.galleryID, function(data1, index) {
                        if (data1.value.length) {
                            $scope.exid = data1.value[0].id;

                            RemoveFavService.remove_gallery($scope.exid)
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


    };

    var findIndex = function(text, aCitys) {
        var index = -1;
        for (var i = 0; i <= aCitys.length - 1; i++) {
            if (text === aCitys[i]) {
                index = i;
            };
        }
        return index;
    }

    angular
        .module('app.galleries')
        .controller('GalleriesCtrl', GalleriesCtrl)
        .controller('InformationCtrl', InformationCtrl);
})();
