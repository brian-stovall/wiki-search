document.addEventListener('DOMContentLoaded', function () {
	//references for important DOM objects
	var grab = document.getElementById.bind(document);
	var searchTerm = grab('search-term');
	var resultContainer = grab('result-container');

	var apiCallPrefix='https://en.wikipedia.org/w/api.php?format=json' +
	'&action=query&list=search&callback=populate&srsearch=';

	//storage for the last search value - so as not to repeat searches
	var lastValue;

	//build a element for every search result
	populate = function(JSON_served) {

		var linkPrefix = 'https://en.wikipedia.org/?title=';
		//query.search is the part of the JSON that contains 
		//the data needed
		var data=JSON_served.query.search;

		for (var i = 0; i < data.length; i++) {
			//a wrapper to make the whole well a link
			var link = document.createElement('a');
			link.href = linkPrefix + data[i].title;
			link.classList.add('link');

			//create the outer element to go in resultContainer
			var elem = document.createElement('div');
			elem.classList.add('infoDiv');
			elem.classList.add('well');

			//the article title
			var title = document.createElement('h2');
			title.textContent=data[i].title;

			//the summary, which is served as html
			var snippet = document.createElement('p');
			snippet.innerHTML = data[i].snippet;

			//put
			link.appendChild(elem);
			elem.appendChild(title);
			elem.appendChild(snippet);
			resultContainer.appendChild(link);
		}

	}

	//send the entered value to make a request when user presses enter
	//and has requested something different from last time
	searchTerm.onkeyup = function (event) {
		if (event.key === 'Enter' && this.value !== lastValue) {
			//update lastValue on success
			lastValue = this.value;

			//get our jsonp
			var jsonp = document.createElement('script');
			jsonp.id='tempscript';
			jsonp.src = apiCallPrefix + this.value;
			document.body.appendChild(jsonp);
		}
	};


});
