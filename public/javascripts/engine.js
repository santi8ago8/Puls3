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
        GetState: {method: 'post', params: {action: 'getstate'}},
        GetPosts: {method: 'post', params: {action: 'allposts'}, isArray: true},
        Login: {method: 'post', params: {action: 'login'}},
        Exit: {method: 'post', params: {action: 'exit'}}
    });

    $scope.Init = function () {
        $scope.isLoading = true;
        $scope.User.GetState({ain: 'teamo'},
            function (response) {
                //console.log(response);
                $scope.isLogged = response.logged;
            }
        )
    };


    $scope.User.GetPosts(function (data) {
        console.log('ain1');
        $scope.posts = data;
        $scope.isLoading = false;
    });
    $scope.User.Enter = function () {
        $scope.User.Login($scope.newUser, function (r) {
            //console.log(r);
            $scope.isLogged = r.logged
        });
    };
    $scope.User.exit = function () {
        $scope.User.Exit(function () {
            $scope.isLogged = false;
        });
    }

});
