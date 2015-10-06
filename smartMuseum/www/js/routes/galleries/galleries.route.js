/**
 * Galleries route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name Galleries Route
     * @module app.galleries
     * @requires $stateProvider
     * @description
     * Router for the galleries page.
     *
     * @ngInject
     */
    function galleriesRoute($stateProvider) {
        $stateProvider
            .state('app.tabs.galleries', {
                cache: false,
                url: "/galleries",
                views: {
                    'galleries-tab': {
                        templateUrl: "js/routes/galleries/galleries.html",
                        controller: 'GalleriesCtrl'
                    }
                }
            });
            $stateProvider
            .state('app.information', {
                cache: false,
                url: "/information/:_galleryID/:_galleryIMG/:_gallerydesc/:_gallerytitle",
                views: {
                    'menuContent': {
                        templateUrl: "js/routes/galleries/information.html",
                        controller: 'InformationCtrl'
                    }
                }
            });    

    }


    angular
        .module('app.galleries')
        .config(galleriesRoute);


})();
