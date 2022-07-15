import { Component, OnInit } from '@angular/core';

import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];

  // movies: Movie[] = [];

  constructor(private moviesServ: MoviesService) { }

  ngOnInit(): void {
    this.moviesServ.getMovies().subscribe((resp: any) => {
      this.popularMovies = resp.results;
      console.log(this.popularMovies);
    })

    this.moviesServ.getMovies('upcoming').subscribe((resp: any) => {
      this.upcomingMovies = resp.results;
    })

    this.moviesServ.getMovies('top_rated').subscribe((resp: any) => {
      this.topRatedMovies = resp.results;
    })
  }

}
