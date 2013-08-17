/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Puls3' });
};

exports.publish = function (req, res) {
    if (req.session.logged) {
        res.render('publish', {title: 'Publish, Puls3'});
    }
    else {
        res.writeHead(300,{'Location': 'http://localhost:3000'});
        res.end();
    }
};

exports.users = function (req, res) {
    console.log('json')
    res.json([
        {hola: 2, juan: 7},
        {name: 'juan', loco: 'ñiìíí`çií'}
    ]);
};