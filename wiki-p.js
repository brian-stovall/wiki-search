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
		var linkPrefix = 'https://en.wikipedia.org/?title=';
		data=data.query.search;

		for (var i = 0; i < data.length; i++) {
			var link = document.createElement('a');
			link.href = linkPrefix + data[i].title;
			link.classList.add('link');

			var elem = document.createElement('div');
			elem.classList.add('infoDiv');
			elem.classList.add('well');
			var title = document.createElement('h2');
			title.textContent=data[i].title;
			var snippet = document.createElement('p');
			snippet.innerHTML = data[i].snippet;
			link.appendChild(elem);
			elem.appendChild(title);
			elem.appendChild(snippet);
			resultContainer.appendChild(link);
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
