document.addEventListener('DOMContentLoaded', function () {
	var grab = document.getElementById.bind(document);
	var searchTerm = grab('search-term');
	var resultContainer = grab('result-container');

	var apiCallPrefix='https://en.wikipedia.org/w/api.php?format=json' +
	'&action=query&list=search&callback=populate&srsearch=';

	//storage for the last search value - so as not to repeat searches
	var lastValue;

	//build a element for every search result
	populate = function(data) {
		data=data.query.search;
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
			var elem = document.createElement('div');
			//elem.src = data[i].title;
			elem.classList.add('infoDiv');
			console.log(data[i].title);
			elem.textContent=data[i].title;
			resultContainer.appendChild(elem);
		}

	}

	//send the entered value to make a request when user presses enter
	searchTerm.onkeyup = function (event) {
		if (event.key === 'Enter' && this.value !== lastValue) {
			lastValue = this.value;
			var jsonp = document.createElement('script');
			jsonp.id='tempscript';
			jsonp.src = apiCallPrefix + this.value;
			document.body.appendChild(jsonp);
		}
	};


});
