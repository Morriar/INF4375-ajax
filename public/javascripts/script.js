// Get the city selected in #city_selector
function getSelectedCity() {
	var select = document.getElementById("city_selector");
	return select.options[select.selectedIndex].value;
}

// Load city list from REST service
function loadCities() {
	var request = new XMLHttpRequest();
	var url = "/cities";

	request.open("GET", url, true);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var select = document.getElementById("city_selector");
			var cities = JSON.parse(request.responseText);
			for(i in cities) {
				var opt = document.createElement("option");
				opt.innerHTML = cities[i]
				select.appendChild(opt);
			}
		}
	};
	request.send();
}

// Load city portal panel
function loadCity() {
	var city = getSelectedCity();
	loadWeather(city);
	loadNews(city);
}

// Load weather div
function loadWeather(city) {
	var request = new XMLHttpRequest();
	var url = "/weather/" + city;

	request.open("GET", url, true);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var xml = request.responseText;
			var parser = new DOMParser();
			var doc = parser.parseFromString(xml, "text/xml");
			var temp = doc.getElementsByTagName('temp')[0];
			var div = document.getElementById("weather");
			console.log(div);
			div.innerHTML = "Il fait " + temp.innerHTML + " à " + city;
		}
	};
	request.send();
}

// Load news div
function loadNews(city) {
	var request = new XMLHttpRequest();
	var url = "/news/" + city;

	request.open("GET", url, true);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var json = JSON.parse(request.responseText);
			var div = document.getElementById("news");
			div.innerHTML = json.content;
		}
	};
	request.send();
}

// Load city admin panel
function loadAdmin() {
	var city = getSelectedCity();
	loadNews(city);
}

// Push news info
function submitNews() {
	var city = getSelectedCity();
	//Data to push
	var jsonData = JSON.stringify({
		city: city,
		content: document.getElementById("news").value
	});

	var request = new XMLHttpRequest();
	var url = "/news/" + city;

	request.open("PUT", url, true);
	request.setRequestHeader("Content-type", "application/json");
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			var div = document.getElementById("messages");
			div.innerHTML = request.responseText;
		}
	};
	request.send(jsonData);
}
