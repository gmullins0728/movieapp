import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies.service';
import { BehaviorSubject } from 'rxjs';


interface Movies {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  favorite: boolean;
}

interface movieServiceData {
  page: number;
  results: Movies[];
  total_results: number;
  total_pages: number;
  showArrow: boolean;
}

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

  list: Movies[];
  movie: any;
  errorMessage: string;
  movieId: number;
  red: boolean = true;
  favorite: boolean;

  main: boolean = false;
  movieString: string;
  

  // mainfilter: boolean = false;
  genreList: Genres[];
  genreId: number = 0;


  constructor(public route: ActivatedRoute, private movieService: MovieService, ) { }

  ngOnInit() {

    this.movieService.getGenreMovies().subscribe((data: GenreData) => {
      this.genreList = data.genres;
    });

    this.route.params.subscribe(params => {
      this.movieService.getGenreList(this.genreId).subscribe((data: movieServiceData) => {
        this.movie = data;
        if (data.page === 1) {
          data.showArrow = false;
        } else {
          data.showArrow = true;
        }
        this.movieService.updateMovieList(data.results);
    }),

      error => {
        this.errorMessage = error.message;
      }
  })
} 

  searchMovie = () => {
    this.movieService.searchMovie(this.movieString).subscribe((data: { results: [] }) => {
      console.log(data.results);
      this.movieService.updateMovieList(data.results);
      this.genreId = 0;
    });
  }

}