/**
 * Arts service.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name ArtsService
     * @module app.core
     * @requires
     * @description
     * Service to get the art data.
     *
     * @ngInject
     */
    function ArtsService($http, $q) {
        var ArtsService = {};
        var baseUrl = 'http://smartgallery.duapp.com/odata/mixarts?$top=5';
        var dataAll = '';
        var sliderData = new Array();

        /**
         * @ngdoc method
         * @name ArtsService:get
         * @description
         * Retrieve Arts list.
         *
         * @returns {promise} A promise which is resolved in arts data.
         */


        ArtsService.arts = function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                dataAll = data;
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('获取展品列表信息失败！');
            });
            return deferred.promise;
        };

        ArtsService.filter = function($scope, $stateParams, cateName, buttonID){
           var x = document.getElementById(buttonID);
            if(x.className != "button button-dark activated"){                
                var buttonArrayDisable = {};
                buttonArrayDisable = document.getElementsByClassName("button button-stable");                
                for(var i=0; i<buttonArrayDisable.length; i++){
                    var btn = buttonArrayDisable[i];
                    if (btn.id != buttonID){
                        btn.disabled=true;
                    };                                    
                };
                
                x.className = "button button-dark";

                var message = '下拉刷新，获取作品信息失败!';
                var deferred = $q.defer();
                var url = 'http://smartgallery.duapp.com/odata/mixarts?$top=5&$skip=0&$filter=Art.cateName eq ';
                url = url + cateName;
                console.log('request');
                $http({
                    method: 'GET',
                    url: url,
                    // cache: httpCache,
                }).success(function(data) {
                  console.log('defer');
                    deferred.resolve(data);

                }).error(function() {
                    deferred.reject('message');
                });
                return deferred.promise;

            }else{
                var buttonArrayEnable = {};
                buttonArrayEnable = document.getElementsByClassName("button button-stable");
                 for(var i=0; i<buttonArrayEnable.length; i++){
                    var btn = buttonArrayEnable[i];
                    btn.removeAttribute("disabled");
                }

                x.className = "button button-stable";
                var deferred = $q.defer();
                ArtsService.arts()
                    .then(function(data) {                    
                        deferred.resolve(data);
                    }, function(data) {
                        alert(data);
                    });
                   return deferred.promise; 
            }

        };


        ArtsService.slideArts = function($scope){

            sliderData = [];
            for (var i = 0; i <= $scope.arts.value.length-1; i++) {
                sliderData.push($scope.arts.value[i].Art);
            };
            return sliderData;
        };

        return ArtsService;
    }

    angular
        .module('app.core')
        .factory('ArtsService', ArtsService);

})();
