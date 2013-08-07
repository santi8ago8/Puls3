/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 05/08/13
 * Time: 20:03
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var db = mongoose.connection;
var Usuario = require('./schemas.js').Usuario;

exports.getstate = function (a, b) {
    //console.log(a);
    b.json({logged: a.session.logged});
    //tardetosend(b, {logged: a.session.logged});
};

exports.login = function (a, b) {
    Usuario.find({name: a.body.user},
        function (err, res) {
            if (res.length == 0) {
                //todo insert
                var nuser = new Usuario({
                    name: a.body.user,
                    password: a.body.password
                });
                nuser.save();
                a.session.logged = true;
                // a.session.
                b.json({logged: true});
            }
            else {
                if (res[0].password == a.body.password) {
                    b.json({logged: true});
                    a.session.logged = true;
                }
                else {
                    b.json({logged: false});
                }
            }

        });
    //a.body.user;

};

exports.exit = function (a, b) {

    a.session.logged = false;
    b.end();
};

exports.getPosts = function (a, b) {
    Usuario.find({}, {posts: "posts"}, function (err, res) {
        var posts = [];
        for (var i = 0; i < res.length; i++) {
            var obj = res[i];
            for (var j = 0; j < obj.posts.length; j++) {
                var post = obj.posts[j];
                posts.push(post);
            }
        }
        b.json(posts)

    });

};


function tardetosend(b, res) {
    console.log(res);
    setTimeout(function () {
        b.json(res);
        console.log(res);
    }, 1000)

}
/*
Usuario.update({name:"asd"}, {$push: {posts: {
    title: 'holadesdenodejs5656'
    //_idPost:
}}}, {multi: false}, function (a, b) {
    console.log([a, b]);
});*/