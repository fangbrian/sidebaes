var express = require('express');
var app = express();
var session = require('client-sessions');
var http = require('http');
var locals = require('./locals');
var _url = require('url');
var request = require('request');
var bodyParser = require('body-parser');
var queryString = require('querystring');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.get('/', function(req, res) { 
	res.sendfile('./views/index.html');
});

app.listen(process.env.PORT || 8080);