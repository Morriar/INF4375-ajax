fs = require('fs');
module.exports.cities = JSON.parse(fs.readFileSync('data/cities.json'));
