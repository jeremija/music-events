'use strict';

var ejs = require('ejs');
var express = require('express');
var settings = require('./config.js').settings;
var ctx = require('./context.js');

ejs.open = '{{';
ejs.close = '}}';

module.exports = function(app) {
    var oneDay = 86400000;
    // TODO deprecated
    // app.use(express.compress());

    app.engine('html', ejs.renderFile);
    // app.set('view engine', 'html');
    app.set('views', __dirname + '/../templates');

    function render(req, res, next) {
        // console.log('req.url', req.params);
        var request = req.params[0];
        request = request ? request + '.html' : '/';

        if (request === '/')
        {
            res.redirect('/index.html');
            return;
        }

        // remove first slash
        request = request.replace(/^\//, '');
        res.render(request, function(err, html) {
            if (err) {
                console.log('error redering page', err);
                ctx.log.error('Error rendering page', err);
                res.redirect('/error/404.html');
                return;
            }
            res.send(html);
        });
    }

    app.all('*.html', render);
    app.get('/', render);

    app.use(express.static(__dirname + '/../static', {maxAge: oneDay}));
};