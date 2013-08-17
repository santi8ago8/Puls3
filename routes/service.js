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
var Post = require('./schemas.js').Post;
var fs = require('fs');
var gm = require('gm');

exports.getstate = function (a, b) {
    //console.log(a);
    b.json({logged: a.session.logged, imagen: a.session.imagen});
    //tardetosend(b, {logged: a.session.logged});
};

exports.login = function (a, b) {
    Usuario.find({name: a.body.user},
        function (err, res) {
            if (res.length == 0) {
                //tod0 insert ok
                var nuser = new Usuario({
                    name: a.body.user,
                    password: a.body.password
                });
                nuser.save();
                a.session.logged = true;
                a.session.user = nuser.name;
                a.session.imagen = require('./schemas.js').defImage;
                // a.session.
                b.json({logged: true, imagen: a.session.imagen});
            }
            else {
                if (res[0].password == a.body.password) {
                    a.session.logged = true;
                    a.session.user = res[0].name;
                    a.session.imagen = res[0].imagen;
                    b.json({logged: true, imagen: a.session.imagen});
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
    var query = {};
    if (a.body.category) query.category = a.body.category;
    Post.find(query, function (err, res) {
        //tardetosend(b, res);
        b.json(res)

    });

};

exports.uploadfile = function (a, b) {
    // console.log(a);
    var file = a.files.fileimage;
    var path = file.path;
    var ind = path.lastIndexOf('\\') + 1;
    var newPath = "./public/images/users/" + path.substr(ind) + '.' + file.type.replace("image/", '');
    var newPath2 = "./public/images/users/" + path.substr(ind) + '_2.' + file.type.replace("image/", '');
    var visiblePath = "/images/users/" + path.substr(ind) + '.' + file.type.replace("image/", '');


    fs.rename(path, newPath, function (err) {

        Usuario.update(
            {name: a.session.user}, //find
            { //update
                $set: {
                    imagen: visiblePath
                }
            },
            function (err) {
                if (err)console.log(err);
                a.session.imagen = visiblePath;
                b.json({});
            }
        );
    })


};

function tardetosend(b, res) {
    //console.log(res);
    setTimeout(function () {
        b.json(res);
        //  console.log(res);
    }, 500)

}
/*
 console.log(Post);
 new Post({
 user: "asd",
 title: 'holadesdenodejs5656',
 category: 'python',
 content: "hola contenido."
 //_idPost:
 }).save(function (a, b) {
 console.log([a, b]);
 });*/