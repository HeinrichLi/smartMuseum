/**
 * news route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name news
     * @module app.news
     * @requires $stateProvider
     * @description
     * Router for the news page.
     *
     * @ngInject
     */
    function newRoute($stateProvider) {
        $stateProvider
            .state('app.new', {
                cache: false,
                url: "/new/:id/:title/:posterURL/:description/:subTitle",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/news/news.html",
                        controller: 'NewsCtrl'
                    }
                }
            });
    }

    angular
        .module('app.news')
        .config(newRoute);

})();
