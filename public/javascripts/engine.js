/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 05/08/13
 * Time: 20:43
 * To change this template use File | Settings | File Templates.
 */


var puls3 = angular.module('Puls3', ['ngResource']);

puls3.controller('AllController', function ($scope, $resource) {
    console.log('ain');
    $scope.User = $resource('/service/:action', {}, {
        GetPosts: {method: 'post', params: {action: 'allposts'}, isArray: true}
    });
    $scope.User.add = function () {
        $scope.users.push(Math.random());
    };
    $scope.User.GetPosts(function (data) {
        console.log('ain1');
        $scope.users = data;
    });


});
