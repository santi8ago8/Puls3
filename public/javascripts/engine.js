/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 05/08/13
 * Time: 20:43
 * To change this template use File | Settings | File Templates.
 */


var puls3 = angular.module('Puls3', ['ngResource']);

puls3.controller('AllController', function ($scope, $resource, $http) {
    console.log('ain');

    $scope.User = $resource('/api/:action', {}, {
        GetState: {method: 'post', params: {action: 'getstate'}},
        GetPosts: {method: 'post', params: {action: 'allposts'}, isArray: true},
        Login: {method: 'post', params: {action: 'login'}},
        Exit: {method: 'post', params: {action: 'exit'}},
        UploadFile: {method: 'post', params: {action: 'uploadfile'}},
        NewPost: {method: 'post', params: {action: 'newpost'}}
    });

    $scope.Init = function () {
        $scope.isLoading = true;
        $scope.isLoadingHeader = false;
        $scope.User.GetState(setState);

    };
    var setState = function (response) {
        $scope.isLoadingHeader = true;
        $scope.isLogged = response.logged;
        if ($scope.isLogged)
            setDrager();
        $scope.imgUser = response.imagen;
    };
    $scope.GetPosts = function (category) {
        $scope.isLoading = true;
        $scope.posts = undefined;
        $scope.User.GetPosts({category: category}, function (data) {
            $scope.posts = data;
            $scope.isLoading = false;
        });
    };
    $scope.GetPosts();

    $scope.User.Enter = function () {
        if ($scope.newUser.user != '' && $scope.newUser.password != '')
            $scope.User.Login($scope.newUser, function (r) {
                //console.log(r);
                $scope.isLogged = r.logged;
                $scope.imgUser = r.imagen;

                setDrager();

            });
    };
    $scope.User.exit = function () {
        $scope.User.Exit(function () {
            $scope.isLogged = false;
        });
    };
    var setdrag = false;
    var setDrager = function () {
        if (!setdrag) {
            setdrag = true;
            var imagen = $('#imageProfile img');
            var logs = function (e) {
                imagen.addClass('graginside');
                e.stopPropagation();
                e.preventDefault();
                if (e.type == 'drop') {
                    var file = e.dataTransfer.files[0];
                    if (/image\/\w+/.test(file.type))
                        $http({
                            method: 'POST',
                            url: "/api/uploadfile",
                            headers: { 'Content-Type': false },
                            transformRequest: function (data) {
                                var formData = new FormData();
                                formData.append("fileimage", e.dataTransfer.files[0]);
                                return formData;
                            },
                            data: { /* model: $scope.model, files: $scope.files*/ }
                        })
                            .success(function (data, status, headers, config) {
                                $scope.User.GetState(setState);
                                imagen.removeClass('graginside');
                            })
                            .error(function (data, status, headers, config) {
                                alert("failed to load image!");
                            });
                    else {
                        imagen.removeClass('graginside');
                        alert('invalid file type!');
                    }
                }
            };
            var elem = document.getElementById('imageProfile');
            elem.addEventListener("dragenter", logs, false);
            elem.addEventListener("dragleave", logs, false);
            elem.addEventListener("dragover", logs, false);
            elem.addEventListener("drop", logs, false);
        }
    }

    $scope.InitPublisher = function () {
        if (!$scope.isCreatingPost) {

            $scope.isCreatingPost = true;

        }
    };

    $scope.publishPost = function () {
        console.log($scope);
        $scope.User.NewPost({post: $scope.newPost}, function (response) {
            $scope.GetPosts();
            $scope.isCreatingPost=false;
        });
    }
});
