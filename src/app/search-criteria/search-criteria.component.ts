import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies.service';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
  providers: [ MovieService ],
})
export class SearchCriteriaComponent implements OnInit {
  searchTerms = new Subject<string>();
  movies;
  routTo: string;
  genreId: number;
  genreList: any;
  

  constructor( private movieService: MovieService, public route: ActivatedRoute) {
    this.movieService.search(this.searchTerms).subscribe(data => {
        this.movies = data;
      },
        err => console.log(err),
        () => console.log(this.movies)
    );
  }
  
  getMovies() {
    this.movieService.getMovies().subscribe(data => {
        this.movies = data;
        console.log(data);
      },
      err => console.log(err),
      () => console.log(`success`)
    );
  }

  getPopular() {
    this.movieService.getPopular().subscribe(data => {
        this.movies = data;
        console.log(data);
      },
      err => console.log(err),
      () => console.log(`success`)
    );
  }

  getUpcoming() {
    this.movieService.getUpcoming().subscribe(data => {
        this.movies = data;
        console.log(data);
      },
      err => console.log(err),
      () => console.log(`success`)
    );
  }

  onChange = () => {
    this.movieService.getGenreList(this.genreId).subscribe((data) => 
    this.movies = data)
  }

  

  ngOnInit(): void {
    this.getMovies();
    // get routes
    this.route.url.subscribe(params => {
      this.routTo = params[0]?.path;

      switch (this.routTo) {
        case 'upcoming':
          //upcoming movies
          this.getUpcoming();
          break;
        case 'popular':
          //get popular movies
          this.getPopular();
          break;

        default:
          //route to home

          break;
      }
    });

    this.movieService.getGenreMovies().subscribe((data) => {
      this.genreList = data['genres'];
    });
  
  }
}

