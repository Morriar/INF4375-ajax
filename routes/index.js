var express = require('express');
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

/* Get a list of the city names */
function cityNames() {
	var cities = [];
	for(i in data.cities) {
		cities.push(i);
	}
	return cities;
}

module.exports = router;
