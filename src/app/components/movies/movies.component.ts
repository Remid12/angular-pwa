import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies;

  constructor() { }

  ngOnInit() {
    fetch('https://api.themoviedb.org/3/trending/movies/day?api_key=57359ff087905e870d40ba4880a1dce0')
      .then((response) => response.json())
      .then((json) => {
        this.movies = json.results;
      })
      .catch(function (err) {
        console.log(err);
      });
  }

}
