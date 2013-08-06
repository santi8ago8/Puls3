/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 05/08/13
 * Time: 20:43
 * To change this template use File | Settings | File Templates.
 */


var puls3 = angular.module('Puls3', []);

puls3.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

var AllController = function ($scope, $http, $templateCache) {
    console.log('ain');

    $scope.list = function () {
        var url = '/service/users/santi';
        $http.post(url).success(function (data) {
            $scope.users = data;
            window.scope=$scope;
        });
    };
    $scope.add=(function(){
        $scope.users.push(Math.random());
    });
    $scope.list();
};
/*
 var app = angular.module('User', ['ngResource']);
 app.run(
 function ($resource) {
 var User = $resource(
 '/service/users',
 {},
 {}
 );

 User.query();

 }
 );*/