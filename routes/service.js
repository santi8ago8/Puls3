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
    var query = {};
    if (a.body.category) query.category = a.body.category;
    Post.find(query, function (err, res) {

        b.json(res)

    });

};


function tardetosend(b, res) {
    console.log(res);
    setTimeout(function () {
        b.json(res);
        console.log(res);
    }, 1000)

}

console.log(Post);
new Post({
    user: "asd",
    title: 'holadesdenodejs5656',
    category: 'python',
    content: "hola contenido."
    //_idPost:
}).save(function (a, b) {
        console.log([a, b]);
    });