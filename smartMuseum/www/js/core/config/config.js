/**
 * Core configuration.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /* @ngInject */
    function onConfig($stateProvider, $urlRouterProvider, $ionicAppProvider) {
        // Identify app
        $ionicAppProvider.identify({
            // The App ID (from apps.ionic.io) for the server

            app_id: 'dfde4e1d',
            // The public API key all services will use for this app
            api_key: '86be1590d4c5fda40e8b80610c1877a7600f0527d29539d0',
            // Set the app to use development pushes
            dev_push: false,
            //production-mode=n

        });

        $urlRouterProvider.otherwise('/app/tabs/main');
    }
    /* @ngInject */
    function onRun($ionicPlatform, $rootScope, $location) {
        $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {
   
        });
    }

    angular
        .module('app.core')
        .config(onConfig)
        .run(onRun)
        .constant('EX_BASE_URL', {
            url: 'http://smartgallery.duapp.com/odata/exhibitions?',
            _skip: '&$skip=',
            _top: '$top=5',
            _filter: '$filter=vanue eq ',
            _gt: ' and startDate gt ',
            _lt: ' and startDate lt '

        })
        .constant('GA_BASE_URL', {
            url: 'http://smartgallery.duapp.com/odata/galleries?',
            _top: '$top=5',
            _skip: '&$skip=',
            _filter: '$filter=name eq '
        });
})();
