/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')
    , path = require('path')
    , service = require('./routes/service.js')
    , mongoose = require('mongoose');

mongoose.connect('localhost','Puls3');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//rutas accesibles
app.get('/', routes.index);
app.get('/publish',routes.publish);

//service : ->
app.post("/api/users/:user", routes.users);
app.post("/api/allposts", service.getPosts);
app.post("/api/getstate", service.getstate);
app.post("/api/login", service.login);
app.post("/api/exit", service.exit);
app.post('/api/uploadfile',service.uploadfile);
app.post('/api/newpost',service.newpost);

app.get("/posts/:id");
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
