import { Component, OnInit } from '@angular/core';

import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private moviesServ: MoviesService) { }

  ngOnInit(): void {
    this.moviesServ.getMovies().subscribe((resp: any) => {
      this.movies = resp.results;
      console.log(this.movies);
    })
  }

}
