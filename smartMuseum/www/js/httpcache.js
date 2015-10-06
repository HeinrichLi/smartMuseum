angular.module('starter.cache', [])

.factory('httpCache', function($cacheFactory) {
    return $cacheFactory('lru', {
        capacity: 20
    });
});
