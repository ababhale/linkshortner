var express = require('express');
var randomstring = require("randomstring");
var LinkShortnerService = require('./src/Backend/LinkShortnerService.js');
//create router
var router = express.Router();

router.get('/suggestions/:charset*?', (req, res) => {
	var suggestions = [];
	var charset = req.params.charset;
	var randomStrOptions = {
		length: 8
	}
	if (charset) {
		randomStrOptions.charset = charset;
	}
	console.log('Charset is ' + charset);
	for (var i = 0; i < 5; i++) {
		var id = randomstring.generate(randomStrOptions);
		//Do not include duplicates
		if (suggestions.indexOf(id) === -1) {
			suggestions.push(id);
		}
	}
	var result = {
		suggestions: suggestions
	}
	res.json(result);
});

router.get('/retrieve-all-links', (req, res) => {
	console.log('GET All links');
	console.log(req.params);
	var result = LinkShortnerService.retrieveAllLinks(req.params);
	if (result.status === '00') {
		res.status(200).json(result);
	} else {
		res.status(500).json(result);
	}
});

router.get('/retrieve-single-link/:link', (req, res) => {
	console.log('GET Single link');
	console.log(req.params);
	var result = LinkShortnerService.retrieveSingleLink(req.params.link);
	if (result.status === '00') {
		res.status(200).json(result);
	} else {
		res.status(500).json(result);
	}
});



router.post('/create-short-link', (req, res) => {
	console.log('POST Request received');
	console.log(req.body);
	var result = LinkShortnerService.createLink(req.body);
	if (result.status === '00') {
		res.status(200).json(result);
	} else {
		res.status(500).json(result);
	}
});

module.exports = router;