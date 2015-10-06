/**
 * Search controller.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc controller
     * @name SearchCtrl
     * @module app.search
     * @requires
     * @requires 
     * @description
     * Controller for the search page.
     *
     * @ngInject
     */
    function SearchCtrl($scope,$state,SearchService,PassArtsListService) {
        $scope.ischoosed=0;
        $scope.searchResult=[];
        $scope.query={};
        var storage = window.localStorage;

        $scope.iscurrentchoosed=function(number)
        {
            if ($scope.ischoosed==number) {
                return true;
            }
            return false;
        };
        $scope.changechoosed=function(number)
        {
            $scope.ischoosed=number;
            $scope.searchResult=null;
        };

        $scope.go_back=function()
        {
            $scope.query={};
            $scope.searchResult=[];
            $state.go("app.tabs.main", {});
        };

        $scope.search=function()
        {
            if($scope.query.name != "")
                SearchService.search($scope.ischoosed,$scope.query.name).then(function(data){
                $scope.searchResult=data;
                });
        };

        $scope.go_exhibition = function(state, Obeject) {
            $state.go(state, {
                'id': Obeject.id,
                'navigation': 'app.search'
            });
        };

        $scope.go_art = function(state, index) {
            //var temp=$scope.searchResult.value;
            PassArtsListService.sendList($scope.searchResult.value.slice());
            $state.go(state, {
                'myindex': index,
                'navigation': 'app.search',
                'title':'搜索结果'
            });
        };

        $scope.go_gallery = function(state, Obeject) {
             $state.go(state, {
                '_name': Obeject.name,
                '_galleryIMG': Obeject.posterURL,
                '_gallerydesc': Obeject.description,
                '_gallerytitle': Obeject.name,
                '_nav': 'app.search'
            });
        };
       
    }

    angular
        .module('app.search')
        .controller('SearchCtrl', SearchCtrl);
})();
