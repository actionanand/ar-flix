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

  getPagedMovies(page: number = 1) {
    this.moviesServ.searchMovies(page).subscribe(resp => {
      this.movies = resp;
    });
  }

  ngOnInit(): void {
    this.getPagedMovies();
  }

  paginate(event: any) {
    this.getPagedMovies(event.page + 1);
  }

}
