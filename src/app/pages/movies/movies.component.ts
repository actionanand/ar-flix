import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private moviesServ: MoviesService) { }

  ngOnInit(): void {
    this.moviesServ.getMovies('popular', 20).subscribe(resp => {
      this.movies = resp;
    });
  }

}
