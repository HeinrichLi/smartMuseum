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
  function SlideCtrl($scope, $state, $rootScope, $stateParams, $ionicHistory,$ionicPopover,$ionicPopup,
    ArtService, AddPraiseService, RemovePraiseService, ArtPraiseInfoService,
    AddFavService, RemoveFavService, MyPraiseInfoService, MyFavInfoService, RefreshService,
    ExhibitionService, PassArtsListService, $ionicSlideBoxDelegate,$timeout, $ionicModal, $sce, $window) {

      //*********************页面滑动时初始化页面******************************************
      $scope.loadArtInfo = function(myindex){

        $scope.myIndex = myindex;
        var last = $scope.arts.length - 1;
        //if slide to the endof list, and lazy load is required, load more data
        if (myindex == last)
        { console.log("last");
        if ($scope.load)
          { loadMore(5);}
      }
      console.log("switch to index " + myindex);
      ArtPraiseInfoService.praise($scope.arts[myindex]._id, myindex, function(data, index) {

        if(data.value.length)
        {
              $scope.arts[index].praiseno = data.value.length;
              $scope.arts[index].praise = data;

        }
        else{
          $scope.arts[index].praiseno = 0;
        }
      });

      MyPraiseInfoService.mypraise($rootScope.user, $scope.arts[myindex]._id, myindex, function(data, index) {
        if (data.value.length) {

              $scope.arts[index].praiseid = data.value[0].id;
              $scope.arts[index].lik = 'tab-item active';

        }
      });

      MyFavInfoService.myfav($rootScope.user, $scope.arts[myindex]._id)
      .then(function(data) {

        if (data.value.length) {
          $scope.arts[myindex].favid = data.value[0].id;
          $scope.arts[myindex].fav = 'tab-item active';
        } else {

        }

      }, function(data) {
        alert(data);
      });

    }

    //***********************Navigation***************************

    $scope.go = function() {
      PassArtsListService.sendList($scope.arts);

      $state.go('app.gridpaints', {
        'navigation': 'app.slidepaints',
        'from': $stateParams.navigation,
        'id': $stateParams.id,
        'title': $stateParams.title,
        'cate' : $stateParams.cate,
        'myindex': $scope.myIndex

      });
    };

    $scope.goback = function(){

      var id = PassArtsListService.getID();
      if($stateParams.navigation === 'app.exhibition'){
        $state.go('app.exhibition', {
          'id': id
        });}
        else
        {
          $state.go($stateParams.navigation, {
            'cate' : $stateParams.cate
          });
        }
      };

      //*************************打开页面***********************************

      if($stateParams.myindex) {
        console.log('You want slide ' + $stateParams.myindex);
        $scope.myActiveSlide = $stateParams.myindex;
      }
      else {
        console.log('You want slide empty');
        $scope.myActiveSlide = 0;
      }


      if($stateParams.id){
        $scope.slideTitle = $stateParams.title;
        $scope.load = false;

        PassArtsListService.setID($stateParams.id);

        ExhibitionService.exhibition($stateParams.id)
        .then(function(data) {
          $scope.arts = data.value[0].Art;
          for (var i=0;i<$scope.arts.length;i++)
          {
            initSlide($scope.arts[i]);
          }
          $ionicSlideBoxDelegate.update();
          $scope.loadArtInfo(0);
        }, function(data) {
          alert(data);
        });

      }
      else {
        $scope.arts = PassArtsListService.getList();
        $scope.load = true;
        for (var i=0;i<$scope.arts.length;i++)
        {
          initSlide($scope.arts[i]);
        }
        $ionicSlideBoxDelegate.update();
        $scope.loadArtInfo($scope.myActiveSlide);
      }

      if ( $scope.slideTitle === undefined )
      {
        $scope.slideTitle = '精选作品';
      }

      //******************合法加载mp3连接*******************************************
      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }
      //***************** 初始化页面及侧拉加载***************************************
      function initSlide(art){
      art.mp3 = "http://smartgallery.duapp.com/sounds/%E7%99%BD%E6%9C%88%E5%85%89%20-%20%E5%BC%A0%E4%BF%A1%E5%93%B2.mp3";
      art.pause = false;
      art.play = true;
      art.lik = 'tab-item';
      art.fav = 'tab-item';
      art.praiseno = 0;
    };


     function loadMore(NumofArttoLoad) {
        // var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=';
        if ($scope.arts) {

            var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=';
            var dataLength = $scope.arts.length + NumofArttoLoad;
            var indexStart = $scope.arts.length;
            var message = '上拉加载，获取作品信息失败!';
            if($stateParams.cate === '')
            {
              url = url + dataLength;
            }
            else{
              url = url + dataLength + '&$filter=Art.cateName eq ' + "'" + $stateParams.cate + "'";
            }


            RefreshService.get(url, message)
                .then(function(data) {
                  if (indexStart == data.value.length)
                  {
                    $scope.load = false;
                  }
                  else {


                    for( var i = indexStart; i < data.value.length; i++)
                    {
                      var newitem = data.value[i].Art;
                      initSlide(newitem);
                      $scope.arts.push(newitem);
                    }
                  $ionicSlideBoxDelegate.update();
                }

                });
            $scope.$broadcast('scroll.infiniteScrollComplete');

        } else {

            $scope.$broadcast('scroll.infiniteScrollComplete');

        }

    };


      //*************************播放说明***********************

      $scope.playIntro = function(){


        $scope.arts[$scope.myIndex].play = false;
        $scope.arts[$scope.myIndex].pause = true;
        var myAudio = document.getElementById($scope.arts[$scope.myIndex]._id);
        myAudio.play();



      }

      $scope.stopIntro = function(){
        $scope.arts[$scope.myIndex].play = true;
        $scope.arts[$scope.myIndex].pause = false;
        var myAudio = document.getElementById($scope.arts[$scope.myIndex]._id);
        myAudio.pause();

      }




      //*************************点赞和收藏****************************

      //收藏
      $scope.dofav = function(item) {

        if (!$rootScope.user) {
          $ionicPopup.alert({
            title: "提醒!",
            template: "请先登录"
          });
        } else {

          if ($scope.arts[$scope.myIndex].fav == 'tab-item') {
            AddFavService.post($rootScope.user, $scope.arts[$scope.myIndex]._id)
            .then(function(data) {
              $scope.arts[$scope.myIndex].favid = data.id;
              $scope.arts[$scope.myIndex].fav = 'tab-item active';
            }, function(data) {
              alert(data);
            });

          } else {

            RemoveFavService.remove($scope.arts[$scope.myIndex].favid)
            .then(function(data) {
              $scope.arts[$scope.myIndex].fav = 'tab-item';
            }, function(data) {
              alert(data);
            });
          }
        }
      }


    //点赞
      $scope.dolik = function(item) {

        if (!$rootScope.user) {
          $ionicPopup.alert({
            title: "提醒!",
            template: "请先登录"
          });
        } else {

          if ($scope.arts[$scope.myIndex].lik == 'tab-item') {

            AddPraiseService.post($rootScope.user, $scope.arts[$scope.myIndex]._id)
            .then(function(data) {
              $scope.arts[$scope.myIndex].praiseid = data.id;
              $scope.arts[$scope.myIndex].lik = 'tab-item active';
              $scope.arts[$scope.myIndex].praiseno = $scope.arts[$scope.myIndex].praiseno + 1;
            }, function(data) {
              alert(data);
            });

          } else {



            RemovePraiseService.remove($scope.arts[$scope.myIndex].praiseid)
            .then(function(data) {
              $scope.arts[$scope.myIndex].lik = 'tab-item';
              $scope.arts[$scope.myIndex].praiseno = $scope.arts[$scope.myIndex].praiseno - 1;
            }, function(data) {
              alert(data);
            });
          }
        }
      }


      //**********************打开海报大图************************

      $scope.goToSlide = function(url) {
        $scope.modalHeight =  $window.innerHeight + 'px';
        $scope.modalWidth =  $window.innerWidth + 'px';
        $scope.posterURL = url;
        $scope.picture.show();
        // $ionicSlideBoxDelegate.slide(index);
      };

      $ionicModal.fromTemplateUrl('js/routes/slidegrid/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.picture = modal;
      });

      $scope.openPicture = function() {
        $scope.picture.show();
      };

      $scope.closePicture = function() {
        $scope.picture.hide();
      };

      // Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.picture.remove();
      });
      // Execute action on hide modal
      $scope.$on('picture.hide', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('picture.removed', function() {
        // Execute action
      });
      $scope.$on('picture.shown', function() {
        console.log('Modal is shown!');
      });

      //******************************微信分享功能******************************************
      $ionicPopover.fromTemplateUrl("js/routes/slidegrid/share.html", {
        scope: $scope
      })
      .then(function(popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function($event, myIndex) {
        $scope.myIndex = myIndex;
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
          params.text = $scope.arts[$scope.myIndex].title;
        } else {
          params.message = {
            title: $scope.arts[$scope.myIndex].title,
            description: $scope.arts[$scope.myIndex].decsription,
            thumb: $scope.arts[$scope.myIndex].posterThumbnailURL,
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
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.type = Wechat.Type.IMAGE;
            params.message.media.image = $scope.arts[$scope.myIndex].posterURL;
            break;

            case 'send-link':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.webpageUrl = "http://smartgallery.duapp.com/paint?id=" + $scope.arts[$scope.myIndex]._id;
            params.message.media.type = Wechat.Type.LINK;
            break;

            case 'send-music':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.type = Wechat.Type.MUSIC;
            params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
            params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
            break;

            case 'send-video':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.type = Wechat.Type.VIDEO;
            params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
            break;

            case 'send-app':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.type = Wechat.Type.APP;
            params.message.media.extInfo = "<xml>extend info</xml>";
            params.message.media.url = "http://weixin.qq.com";
            break;

            case 'send-nongif':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.type = Wechat.Type.EMOTION;
            params.message.media.emotion = "$scope.paint.value[0].posterURL";
            break;

            case 'send-gif':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
            params.message.media.type = Wechat.Type.EMOTION;
            params.message.media.emotion = "www/resources/res6.gif";
            break;

            case 'send-file':
            params.message.thumb = $scope.arts[$scope.myIndex].posterThumbnailURL;
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

        console.log(params);
        Wechat.share(params, function() {

        }, function(reason) {

        });

      };



    }

    angular
    .module('app.slidegrid')
    .controller('SlideCtrl', SlideCtrl);
  })();
