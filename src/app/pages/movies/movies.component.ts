import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';

import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  genreId: string | null = null;
  searchTerm: string = '';

  constructor(private moviesServ: MoviesService, private route: ActivatedRoute) { }

  getPagedMovies(page: number = 1) {
    this.moviesServ.searchMovies(page).subscribe(resp => {
      this.movies = resp;
    });
  }

  getMoviesByGenre(id: string, page: number = 1) {
    this.moviesServ.getMoviesByGenre(id, page).subscribe(resp => {
      this.movies = resp;
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({genreId}) => {
      this.genreId = genreId;
      if (genreId) {
        this.getMoviesByGenre(genreId);
      } else {
        this.getPagedMovies();
      }
    });
  }

  onSearchChange() {
    this.moviesServ.searchMovies(1, this.searchTerm.trim()).subscribe(resp => {
      this.movies = resp;
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;

    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      this.getPagedMovies(pageNumber);
    }
  }

}
