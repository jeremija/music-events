'use strict';


var express = require('express');
var config = require('./config.js');
var ctx = require('./context.js');
var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var Q = require('q');

var log = ctx.log = require('./log.js');
log.info('starting express server...');

var app = ctx.app = express();
app.use(cookieParser());
app.use(require('body-parser').json());
config.setup(app);

app.use(function(req, res, next) {
	req.uuid = uuid.v1();
    req.start = new Date();
    res._json = res.json;
    res.json = function(body) {
        res._json({error: null, data: body});
    };
	next();
});

function start() {
    var port = process.env.PORT || 8080;
    var server = app.listen(port);
    log.info('listening on port ' + port);
    return server;
}

require('./middleware/api.js');
require('./templating.js')(app);

app.use(function(err, req, res, next) {
    // global error handler
    res.status(500).json({error: err.message});
});

module.exports = ctx;
ctx.server = start();