'use strict';

var express = require('express');
var app = express();
var router = express.Router();

router.use(function (req, res, next) {
	console.log('%s %s %s', req.method, req.url, req.path);
	next();
});
router.route('/').all(function (req, res, next) {
	console.log('redirecting /');
	req.url = '/index.html';
	next();
});

router.use(express.static(__dirname + '/app'));
app.use('/', router);

var server = app.listen(8888, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
