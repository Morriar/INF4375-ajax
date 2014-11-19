// Get the city selected in #city_selector
function getSelectedCity() {
	var select = document.getElementById("city_selector");
	return select.options[select.selectedIndex].value;
}

// Load city list from REST service
function loadCities() {
	// TODO
}

// Load city portal panel
function loadCity() {
	var city = getSelectedCity();
	loadWeather(city);
	loadNews(city);
}

// Load weather div
function loadWeather(city) {
	// TODO
}

// Load news div
function loadNews(city) {
	// TODO
}

// Load city admin panel
function loadAdmin() {
	var city = getSelectedCity();
	loadNews(city);
}

// Push news info
function submitNews() {
	// TODO
}
