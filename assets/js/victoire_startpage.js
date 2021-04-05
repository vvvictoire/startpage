const form = document.querySelector('form');
earch_query = $("#search_field").val('');

function parseSearchQuery(search_query){
	// search_query: the content of the search_query field, with at least 2 words (including the bang)
	// returns an object with the bang (the first word, it still has the '!') and the query (all the other words)
	var parsed_array = search_query.split(" ");
	var bang = parsed_array.shift();
	var query = parsed_array.join(' ');
	return {bang: bang, query: query};
};

function redirect(bang, query){
	//bang: a single word, starting with a '!'
	//query: a string of word(s)
	switch(bang){
		case '!q':
			location.href = 'https://duckduckgo.com/?q=' + query;
			break;
		case '!bang':
			location.href = 'https://duckduckgo.com/bang#bangs-list';
			break;
	}
}

form.addEventListener('submit', event => {
	// submit event detected
	event.preventDefault()
	var search_query = $("#search_field").val();
	if (search_query !== '') {
		// if the search_query starts with a '!', then we’ll redirect
		if (search_query[0] === '!'){
			var bang_query = parseSearchQuery(search_query);
			redirect(bang_query.bang, bang_query.query);
		}
		// if the search_query doesn’t start with a '!', then we evaluate as a maths expression
		else {
			var result = math.evaluate(search_query);
			var old_result_field = $("#result_field").html();
			$("#result_field").html(old_result_field + "<br/>" + search_query + " = " + result);
			$("#search_field").val('');
		}
	}
});
