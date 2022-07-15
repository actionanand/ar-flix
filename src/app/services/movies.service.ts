import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { Movie, MovieDto, MovieVideoDto } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = env.baseUrl;

  constructor(private http: HttpClient) { }

  getMovies(type: string = 'popular', count: number = 12) {
    return this.http.get<MovieDto>(this.url + '/movie/' + type)
      .pipe(
        switchMap(resp => {
          return of(resp.results.slice(0, count));
        })
      );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(this.url + '/movie/' + id);
  }

  searchMovies(page: number = 2) {
    return this.http.get<MovieDto>(`${this.url}/movie/popular?page=${page}`)
      .pipe(
        switchMap(resp => {
          return of(resp.results);
        })
      );
  }

  getMovieVideos(id: string) {
    return this.http.get<MovieVideoDto>(`${this.url}/movie/${id}/videos`)
      .pipe(
        switchMap(resp => {
          return of(resp.results);
        })
      );
  }
}
