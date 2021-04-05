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

var mathematicians = [
	{
		name: "René Descartes",
		facts: `1596-1650 <br/> A popularisé l’usage des lettres
		<em>x</em>, <em>y</em> et <em>z</em>, <br/>ainsi que la notation puissance
		<em>x<sup>n</sup></em>.`,
		image: 'images/Frans_Hals_-_Portret_van_René_Descartes.jpg'
	},
	{
		name: "John Napier",
		facts: `1550-1617 <br/> A inventé les logarithmes, permettant de multiplier
		plus facilement les nombres.`,
		image: 'images/Unknown_artist_-_John_Napier_of_Merchiston_1550–1617,_Discoverer_of_Logarithms_-_PG_2228_-_National_Galleries_of_Scotland.jpg'
	},
	{
		name: "Leonhard Euler",
		facts: `1707-1783 <br/> Est à l’origine de nombreuses branches des mathématiques,
		notamment la théorie des groupes.`,
		image: 'images/Leonhard_Euler_2.jpg'
	},
	{
		name: "John Forbes Nash, Jr.",
		facts: `1928-2015 <br/> Est à l’origine de la théorie des jeux, permettant
		de modéliser (notamment) des interactions sociales et économiques.`,
		image: 'images/John_Forbes_Nash,_Jr._by_Peter_Badge.jpg',
		picture_rights: "Image : Peter Badge CC BY-SA"
	},
	{
		name: "John Horton Conway",
		facts: `1937-2020 <br/> A développé de nombreux domaines des mathématiques,
		notamment la théorie des groupes et celle des nœuds. <br/> Son invention la plus
		connue est celle du jeu de la vie.`,
		image: 'images/John_H_Conway_2005.jpg',
		picture_rights: "Image : Thane Plambeck CC BY"
	}
];

$('body').css({'background': 'no-repeat center'});
$('body').css({'background-color': 'black'});
var randomNumber = Math.floor(Math.random() * mathematicians.length);
$('#name').html(mathematicians[randomNumber].name);
$('#facts').html(mathematicians[randomNumber].facts);
$('#picture_rights').html(mathematicians[randomNumber].picture_rights);
$('body').css({'background-image': 'url(' + mathematicians[randomNumber].image + ')'});
