document.addEventListener('DOMContentLoaded', function () {
	var grab = document.getElementById.bind(document);
	var searchTerm = grab('search-term');

	var apiCallPrefix='https://en.wikipedia.org/w/api.php?format=json' +
	'&action=query&list=search&callback=test&srsearch=';

	test = function(data) {
		alert(data);
	}

	//send the entered value to make a request when user presses enter
	searchTerm.onkeyup = function (event) {
		if (event.key === 'Enter') {
			var tempscript = document.createElement('script');
			tempscript.id='tempscript';
			tempscript.src = apiCallPrefix + this.value;
			document.body.appendChild(tempscript);
		}
	};


});
