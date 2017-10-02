var express = require('express');
var app = express();
var session = require('client-sessions');
var http = require('http');
var locals = require('./locals');
var _url = require('url');
var request = require('request');
var bodyParser = require('body-parser');
var queryString = require('querystring');
var db = require('./models');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded());

app.get('/', function(req, res) { 
	res.sendfile('./views/index.html');
});

app.get('/worship', function(req, res) { 
	res.sendfile('./views/worship.html');
});

app.get('/prayer', function(req, res) { 
	res.sendfile('./views/prayer_request.html');
});

app.get('/prayerRequestData', function(req, res) {
	db.PrayerRequest.findAll({
		raw: true
	}).then((prayerRequests) =>{
		res.send({
			"prayer_requests" : prayerRequests 
		});
	});
});

app.post('/prayerRequestData', function(req, res) {
	if (req.body.prayer_request) {
		db.PrayerRequest.create({request: req.body.prayer_request, timestamp: new Date()}).then(prayerRequest => {
			res.send({
				"status" : "success"
			})
		}).catch(error => {
			res.send({
				"status" : "error"
			})
		});
	}
});

db.sequelize.sync().then(function() {
  	app.listen(process.env.PORT || 8080);
});

