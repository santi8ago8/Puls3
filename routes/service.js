/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 05/08/13
 * Time: 20:03
 * To change this template use File | Settings | File Templates.
 */

var Usuario = require('/schems.js').Usuario;

exports.getstate=function(a,b){
    console.log(a);
    b.json(a.session);
};

exports.register=function(a,b){
    console.log(a);
};