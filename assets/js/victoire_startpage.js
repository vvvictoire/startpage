const form = document.querySelector('form');
earch_query = $("#search_field").val('');

function parseSearchQuery(search_query){
	var parsed_array = search_query.split(" ");
	var bang = parsed_array.shift();
	var query = parsed_array.join(' ');
	return {bang: bang, query: query};
};

form.addEventListener('submit', event => {
	// submit event detected
	// TODO: https://duckduckgo.com/bang
	event.preventDefault()
	var search_query = $("#search_field").val();
	if (search_query !== '') {
		if (search_query[0] === '!'){
			var bang_query = parseSearchQuery(search_query);
			switch(bang_query.bang){
				case '!q':
				location.href = 'https://duckduckgo.com/?q=' + bang_query.query;
				break;
			}
		}
		else {
			var result = math.evaluate(search_query);
			$("#result_field").html(search_query + " = " + result);
			$("#search_field").val('');
		}
	}
});
