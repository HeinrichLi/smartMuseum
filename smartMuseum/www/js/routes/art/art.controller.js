/**
 * Art controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name ArtCtrl
     * @module app.art
     * @description
     * Controller for the art page.
     *
     * @ngInject
     */
    function ArtCtrl($scope, $ionicPopover, $state, $ionicPopup,
        $rootScope, $stateParams, ArtService, AddPraiseService, RemovePraiseService, ArtPraiseInfoService,
        AddFavService, RemoveFavService, MyPraiseInfoService, MyFavInfoService, RefreshService, $ionicModal) {
        $scope.fav = 'tab-item';
        $scope.lik = 'tab-item';

        ArtService.art($stateParams.pa_id)
            .then(function(data) {
                $scope.paint = data;
            }, function(data) {
                alert(data);
            });

        ArtPraiseInfoService.praise($stateParams.pa_id)
            .then(function(data) {
                $scope.praise = data;
                $scope.praiseno = data.value.length;
            }, function(data) {
                alert(data);
            });


        MyPraiseInfoService.mypraise($rootScope.user, $stateParams.pa_id)
            .then(function(data) {

                if (data.value.length) {
                    $scope.praiseid = data.value[0].id;
                    $scope.lik = 'tab-item active';
                } else {
                    $scope.lik = 'tab-item';
                }

            }, function(data) {
                alert(data);
            });

        MyFavInfoService.myfav($rootScope.user, $stateParams.pa_id)
            .then(function(data) {

                if (data.value.length) {
                    $scope.favid = data.value[0].id;
                    $scope.fav = 'tab-item active';
                } else {
                    $scope.fav = 'tab-item';
                }

            }, function(data) {
                alert(data);
            });

        $scope.doRefresh = function() {
            var url = 'http://smartgallery.duapp.com/odata/arts?$filter=_id eq ';
            //var params = EX_BASE_URL.params + $scope.exhibitions.value.length;
            message = '下拉刷新，获取作品信息失败!';
            url = url + "'" + $stateParams.pa_id + "'";
            RefreshService.get(url, message)
                .then(function(data) {
                    $scope.paint = data;
                    //$scope.praiseno = data.value.length;
                    //Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        $scope.navigation = $stateParams.navigation;
        $scope.pa_id = $stateParams.pa_id;
        $scope.ex_id = $stateParams.ex_id;
        $scope.subject = $stateParams.subject;
        $scope.go = function() {
            $state.go($scope.navigation, {
                'id': $scope.ex_id,
                'subject': $scope.subject
            });
        };


        $ionicModal.fromTemplateUrl('js/routes/art/image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            $ionicSlideBoxDelegate.slide(0);
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hide', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });
        $scope.$on('modal.shown', function() {
            console.log('Modal is shown!');
        });

        // Call this functions if you need to manually control the slides
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.goToSlide = function(index) {
            $scope.modal.show();
            // $ionicSlideBoxDelegate.slide(index);
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };

        $ionicPopover.fromTemplateUrl("js/routes/art/share.html", {
                scope: $scope
            })
            .then(function(popover) {
                $scope.popover = popover;
            });
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //销毁事件回调处理：清理popover对象
        $scope.$on("$destroy", function() {
            $scope.popover.remove();
        });
        // 隐藏事件回调处理
        $scope.$on("popover.hidden", function() {
            // Execute action
        });
        //删除事件回调处理
        $scope.$on("popover.removed", function() {
            // Execute action
        });

        $scope.handle = function(id, sc) {
            var params = {
                scene: sc
            };

            if (id == 'send-text') {
                params.text = $scope.paint.value[0].title;
            } else {
                params.message = {
                    title: $scope.paint.value[0].title,
                    description: $scope.paint.value[0].decsription,
                    thumb: $scope.paint.value[0].posterThumbnailURL,
                    mediaTagName: "TEST-TAG-001",
                    //messageExt: "这幅作品非常的不错，分享给你",
                    //messageAction: "<action>dotalist</action>",
                    media: {}
                };

                switch (id) {
                    case 'check-installed':
                        Wechat.isInstalled(function(installed) {
                            alert("Wechat installed: " + (installed ? "Yes" : "No"));
                        });
                        return;

                    case 'send-photo':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.IMAGE;
                        params.message.media.image = $scope.paint.value[0].posterURL;
                        break;

                    case 'send-link':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;

                        params.message.media.webpageUrl = "http://smartgallery.duapp.com/paint?id=" + $stateParams.pa_id;
                        params.message.media.type = Wechat.Type.LINK;
                        break;

                    case 'send-music':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.MUSIC;
                        params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
                        params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                        break;

                    case 'send-video':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.VIDEO;
                        params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                        break;

                    case 'send-app':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.APP;
                        params.message.media.extInfo = "<xml>extend info</xml>";
                        params.message.media.url = "http://weixin.qq.com";
                        break;

                    case 'send-nongif':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.EMOTION;
                        params.message.media.emotion = "$scope.paint.value[0].posterURL";
                        break;

                    case 'send-gif':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.EMOTION;
                        params.message.media.emotion = "www/resources/res6.gif";
                        break;

                    case 'send-file':
                        params.message.thumb = $scope.paint.value[0].posterThumbnailURL;
                        params.message.media.type = Wechat.Type.FILE;
                        params.message.media.file = "www/resources/iphone4.pdf";
                        break;

                    case 'auth':
                        Wechat.auth("snsapi_userinfo", function(response) {
                            // you may use response.code to get the access token.
                            alert(JSON.stringify(response));
                        }, function(reason) {
                            alert("Failed: " + reason);
                        });
                        return;

                    default:
                        $ionicPopup.alert({
                            title: 'Not supported!',
                            template: 'Keep patient, young man.'
                        });

                        return;
                }
            }


            Wechat.share(params, function() {

            }, function(reason) {

            });

        };



        $scope.dofav = function(item) {

            if (!$rootScope.user) {
                $ionicPopup.alert({
                    title: "提醒!",
                    template: "请先登录"
                });
            } else {

                if ($scope.fav == 'tab-item') {
                    AddFavService.post($rootScope.user, $stateParams.pa_id)
                        .then(function(data) {
                            $scope.favid = data.id;
                            $scope.fav = 'tab-item active';
                        }, function(data) {
                            alert(data);
                        });

                } else {

                    RemoveFavService.remove($scope.favid)
                        .then(function(data) {
                            $scope.fav = 'tab-item';
                        }, function(data) {
                            alert(data);
                        });
                }
            }
        }



        $scope.dolik = function(item) {

            if (!$rootScope.user) {
                $ionicPopup.alert({
                    title: "提醒!",
                    template: "请先登录"
                });
            } else {

                if ($scope.lik == 'tab-item') {

                    AddPraiseService.post($rootScope.user, $stateParams.pa_id)
                        .then(function(data) {
                            $scope.praiseid = data.id;
                            $scope.lik = 'tab-item active';
                            $scope.praiseno = $scope.praiseno + 1;
                        }, function(data) {
                            alert(data);
                        });

                } else {



                    RemovePraiseService.remove($scope.praiseid)
                        .then(function(data) {
                            $scope.lik = 'tab-item';
                            $scope.praiseno = $scope.praiseno - 1;
                        }, function(data) {
                            alert(data);
                        });
                }
            }
        };
    }

    angular
        .module('app.art')
        .controller('ArtCtrl', ArtCtrl);
})();
