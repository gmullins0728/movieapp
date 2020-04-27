import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MovieService } from '../movies.service';


interface GenreData {
  genres: Genres[];
}

interface Genres {
  id: number;
  number: string;
}


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {

  main: boolean = false;
  movie: any;
  movieString: string;

  mainfilter: boolean = false;
  // search_result: [];

  search_result: [];
  genreList: Genres[];
  genreId: number = 0;


  constructor(public route: ActivatedRoute, private movieService: MovieService, ) { }

  ngOnInit() {

    this.movieService.getGenreMovies().subscribe((data: GenreData) => {
      this.genreList = data.genres;
    });

  }

  toggleFilters = () => {
    this.mainfilter = !this.mainfilter;
  };

  searchMovie = () => {
    this.movieService.searchMovie(this.movieString).subscribe((data: { results: [] }) => {
      console.log(data.results);
      this.movieService.updateMovieList(data.results);
      this.genreId = 0;
    });
  }

  onChange = (event) => {
    this.movieService.getGenreList(this.genreId).subscribe((data: { results: [] }) => this.movieService.updateMovieList(data.results));
    console.log(this.genreId);
  }

  onClick = () => {
    this.genreId = 0;
    console.log(this.genreId);
  }
}