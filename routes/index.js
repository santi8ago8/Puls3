/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Puls3' });
};

exports.users = function (req, res) {
    console.log('json')
    res.json([{hola: 2, juan: 7},{name:'juan',loco:'ñiìíí`çií'}]);
};