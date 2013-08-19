/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 05/08/13
 * Time: 20:22
 * To change this template use File | Settings | File Templates.
 */
var defImage = "/images/drag.png";
var mongoose = require('mongoose');
exports.defImage = defImage;
var schema = mongoose.Schema(
    {
        name: {type: String},
        password: {type: String},
        imagen: {type: String, default: defImage}
    }
);

var Usuario = mongoose.model('Puls3User', schema);
var schemaPost = mongoose.Schema({
    user: {type: String},
    title: {type: String},
    content: {type: String},
    category: {type: String, default: 'Node.js'},
    points: { type: Number, default: 0},
    aggregators: [],
    subtractors: [],
    favorites: [],
    date: {type: Number, default: 0},
    coments: [
        {
            name: {type: String},
            coment: {type: String},
            date: {type: Number}
        }
    ]
});
var Post = mongoose.model("Puls3Post", schemaPost);
exports.Post = Post;
exports.Usuario = Usuario;