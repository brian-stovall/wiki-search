document.addEventListener('DOMContentLoaded', function () {
	var grab = document.getElementById.bind(document);
	var searchTerm = grab('search-term');

	var apiCallPrefix='https://en.wikipedia.org/w/api.php?format=json' +
	'&action=query&list=search&srsearch=';

	var wikiRequest = new XMLHttpRequest();

	wikiRequest.onreadystatechange = function() {
		if (wikiRequest.readyState === 4) {
			console.log('made it: ' + wikiRequest.readyState + ' <- readyState');
			console.log('made it: ' + wikiRequest.status + ' <- status');
		if (wikiRequest.status >= 200 && wikiRequest.status <= 400) 
			console.log('success! rec\'d: ' + wikiRequest.responseText);
		else 
			console.log('fail?! rec\'d: ' + wikiRequest.responseText);
		}
		else {
			console.log('something went wrong');
			console.log(wikiRequest.readyState + ' <-readyState');
			console.log(wikiRequest.status + ' <-status');
		}
	}
  
	//send the entered value to make a request when user presses enter
	searchTerm.onkeyup = function (event) {
		if (event.key === 'Enter') {
			makeRequest(this.value);
		}

	//build and send the request
	function makeRequest(searchTerms) {
		//first, replace whitespace with underscores, per wikipedia API
		var term = searchTerms.replace(/\s/g, '_');
		var url = apiCallPrefix + term;
		wikiRequest.open('GET', encodeURI(url));
		console.log('sending request: ' + encodeURI(url));
		wikiRequest.send(null);
	}

	};

});
