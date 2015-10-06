/**
 * Login service.
 *
 * @author    
 * @copyright 
 * @license   
 */
(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name LoginService
     * @module app.core
     * @requires 
     * @description
     * Service to get the login data.
     *
     * @ngInject
     */
    function LoginService(Restangular) {
        return {
            /**
             * @ngdoc method
             * @name LoginService:get
             * @description
             * Retrieve login by id and password.
             *
             * @returns {promise} A promise which is resolved in user data.
             */
            get: function(id) {
                return Restangular
                    .one('users', id)
                    .get();
            },
            /**
             * @ngdoc method
             * @name UserService:getList
             * @description
             * Retrieve all users.
             *
             * @returns {promise} A promise which is resolved in users list data.
             */
            getList: function() {
                return Restangular
                    .all('users')
                    .getList();
            }
        };
    }

    angular
        .module('app.core')
        .factory('UserService', UserService);

})();
