var express = require('express');
var bodyParser = require('body-parser');
var path = require('./gulpconfig.js');
var routes = require('./server-routes.js');
var userAgent = require('express-useragent').express();
var requestIp = require('request-ip');
var LinkShortnerService = require('./src/Backend/LinkShortnerService.js');

var app = express();

var jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(express.static(path.DEST));
app.use('/api', routes);
app.use('/favicon.ico', (req, res) => {
	res.end();
});
app.use(userAgent);
app.get('/:hash*', (req, res, next) => {
	console.log('Received request');
	console.log(req.params);

	var userstats = req.useragent;
	userstats.ip = requestIp.getClientIp(req);

	var result = LinkShortnerService.getAndLogLinkRetrieval(req.params.hash, userstats);
	if (result.status === '00') {
		console.log(result.data);
		res.redirect(result.data.redirectTo);
	} else {
		res.status(500).json(result);
	}
});

app.listen(3000, () => {
	console.log('Server started at port 3000 http://localhost:3000');
});