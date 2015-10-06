/**
 * Main app module.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    angular.module('starter', [
        // angular modules
        // 'ngAnimate',
        // 'ngSanitize',
        // 'ngMessages',
        //'ngMaterial',

        // 3rd party modules
        // 'ui.router',
        'ionic',
        // 'restangular',
        // 'LocalStorageModule',
        'ngCordova',
        'ionic.service.core',
        'ionic.service.push',

        // app modules
        'app.core',
        'app.layout',
        'app.main',
        'app.news',
        'app.exhibitions',
        'app.exhibition',
        'app.arts',
        'app.galleries',
        'app.gallery',
        'app.ticket',
        'app.map',
        'app.art',
        'app.profile',
        'app.favlist',
        'app.jourlist',
        'app.notification',
        'app.user',
        'app.slidegrid',
        'app.search',
        'app.ibeacons',
        'app.radio'
    ]);

})();
