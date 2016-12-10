;(function() {
	"use strict";

	fetch("http://swapi.co/api/people/1")
	.then(res => res.json())
	.then(function(res) {
		let films = res.films,
			getFilms = films.map(film => fetch(film).then(result => result.json()));

		//return Promis.all(getFilms);
		return Promise.all(getFilms).then(res => ({name,films: res}));
	})
	.then(function(res) {
		let name = res.name,
		films = res.films;

		console.log(`
			${name}
			${films.map(film => "film: " + film.title).join("\n")}
			`);
	})
	.catch(function(e) {
		console.log(e);
	});

}) ();