var express = require('express');
var fs = require('fs');
var xmldom = require('xmldom');
var router = express.Router();
var data = require('../data/cities');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
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
