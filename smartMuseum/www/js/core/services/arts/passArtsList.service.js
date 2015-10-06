/**
 * passArtsList service.
 *
 * @author
 * @copyright
 * @license
 */
(function() {
    'use strict';

    /**
     * @ngdoc service
     * @name PassAtrsListService
     * @module app.core
     * @requires
     * @description
     * Service to get the art data.
     *
     * @ngInject
     */
    function PassArtsListService( ) {
      var passArtsList = {};
      var artsList;
      var exhID;
      passArtsList.sendList = function(data){ artsList = data; };
      passArtsList.getList = function(){ return artsList; };
      passArtsList.setID = function(id){ exhID = id; };
      passArtsList.getID = function(){ return exhID; };

      return passArtsList;
    }

    angular
        .module('app.core')
        .factory('PassArtsListService', PassArtsListService);

})();
