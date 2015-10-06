/**
 * Gallery route.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc object
     * @name Gallery Route
     * @module app.gallery
     * @requires $stateProvider
     * @description
     * Router for the galleries page.
     *
     * @ngInject
     */
    function galleryRoute($stateProvider) {
        $stateProvider.state('app.gallery', {
            cache: false,
            url: "/gallery/:name",
            views: {
                'menuContent': {
                    templateUrl: "js/routes/gallery/gallery.html",
                    controller: 'GalleryCtrl'
                }
            }
        })
    }

    angular
        .module('app.gallery')
        .config(galleryRoute);

})();
