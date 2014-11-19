var express = require('express');
var fs = require('fs');
var xmldom = require('xmldom');
var router = express.Router();
var data = require('../data/cities');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('portal', {});
});

/* GET admin page. */
router.get('/admin', function(req, res) {
  res.render('admin', {});
});


/* GET cities list */
router.get('/cities/', function(req, res) {
	res.json(cityNames());
});

/* GET news article from file */
router.get('/news/:city', function(req, res) {
	var city = req.params.city;
	if(!checkCity(city)) {
		respondCityError(city, res);
	}
	var file = data.cities[city].file;
	fs.readFile('data/' + file, function(err, data) {
		if(err) {
			res.status(500);
			res.render("public_error", {
				message: "Internal server error, try later.",
				reason: "No news to display for city " + city + "."
			});
			return;
		}
		res.json({
			title: "À la une",
			content: data.toString()
		});
	});
});

/* GET weather for a specific city */
router.get('/weather/:city', function(req, res) {
	var city = req.params.city;
	if(!checkCity(city)) {
		respondCityError(city, res);
	}
	res.render("weather", {
		city: city,
		temp: Math.floor((Math.random() * 10) + 1) * -1
	});
});

/* PUT news article for city. */
router.put('/news/:city', function(req, res) {
	var city = req.params.city;
	if(!checkCity(city)) {
		respondCityError(city, res);
	}
	var news = req.body;
	if(!news.content) {
		res.status(400);
		res.render("public_error", {
			message: "Bad Request: Invalid news content.",
			reason: "Expected a JSON object with a `content` key."
		});
	}
	var file = data.cities[city].file;
	fs.writeFile('data/' + file, news.content, function(err) {
		if(err) {
			res.status(500);
			res.render("public_error", {
				message: "Internal server error, try later.",
				reason: "Cannot save news for city " + city + "."
			});
		}
		res.send("News for "+ city +" successfully saved");
	});
});

/* Check if the city is in the `cities` list. */
function checkCity(city) {
	return data.cities[city]
}

/* Get a list of the city names */
function cityNames() {
	var cities = [];
	for(i in data.cities) {
		cities.push(i);
	}
	return cities;
}

/* Respond with error for a unknown city. */
function respondCityError(city, res) {
	res.status(400);
	res.render("public_error", {
		message: "Bad Request: Invalid city `" + city + "`.",
		reason: "Should be one of " + cityNames()
	});
}

module.exports = router;
