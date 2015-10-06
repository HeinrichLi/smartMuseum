/**
 * Login service.
 *
 * @author   
 * @copyright 
 * @license   
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name LoginService
     * @module app.core
     * @requires 
     * @description
     * Service to valdate the login data by id and password.
     *
     * @ngInject
     */
    function LoginService($http, $q, $ionicUser, $ionicPush) {

        var userService = {};
        var userRegister = {};
        var baseUrl = 'http://smartgallery.duapp.com/odata/users';
        var data = '';

        var filterPara1 = '?$filter=user eq ';
        var filterPara2 = ' and password eq ';

        userRegister.pushRegister = function() {
            console.log('Ionic Push: Registering user');

            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,
                onNotification: function(notification) {
                    // Handle new push notifications here
                    console.log(notification);
                    return true;
                }
            });
        };

        userService.login = function(user, password) {
            var deferred = $q.defer();
            baseUrl = 'http://smartgallery.duapp.com/odata/users';
            var filterPara = filterPara1 + "'" + user + "'" + filterPara2 + "'" + password + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('用户不存在！');

            });
            return deferred.promise;
        };

        userService.checkID = function(user) {
            var deferred = $q.defer();
            baseUrl = 'http://smartgallery.duapp.com/odata/users';
            var filterPara = filterPara1 + "'" + user + "'";
            baseUrl = baseUrl + filterPara;
            $http({
                method: 'GET',
                url: baseUrl,
                // cache: httpCache,
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('用户不存在！');

            });
            return deferred.promise;
        };

        userService.post = function(user, name, password) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: baseUrl,
                // cache: httpCache,
                data: {
                    'user': user,
                    'password': password,
                    'name': name
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject('无法注册');
            });
            return deferred.promise;
        };

        // Identifies a user with the Ionic User service
        userService.identifyUser = function(username) {
            console.log('Ionic User: Identifying with Ionic User service');

            var user = $ionicUser.get();
            if (!user.user_id) {
                // Set your user_id here, or generate a random one.
                user.user_id = $ionicUser.generateGUID();
            };

            // Add some metadata to your user object.
            angular.extend(user, {
                name: username,
                bio: 'from smartgallery'
            });

            // Identify your user with the Ionic User Service
            $ionicUser.identify(user).then(function() {
                //$rootScope.identified = true;
                console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
                userRegister.pushRegister();
                console.log('registered!');
            });
        };

        userService.updateToken = function(id, token) {
            baseUrl = 'http://smartgallery.duapp.com/odata/users';
            var sServiceUrl = baseUrl + '(' + id + ')';
            $http({
                method: 'PUT',
                url: sServiceUrl,
                // cache: httpCache,
                data: {
                    'token': token
                }
            });
        };

        return userService;
    }

    angular
        .module('app.core')
        .factory('LoginService', LoginService);

})();
