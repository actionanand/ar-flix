import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { GenresDto } from '../models/genre';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';

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

  searchMovies(page: number = 1, searchTerm?: string) {
    let searchUri = '/movie/popular';
    let params = new HttpParams().set('page', page);

    if (searchTerm) {
      params = params.set('query', searchTerm);
      searchUri = '/search/movie';
    }

    return this.http.get<MovieDto>(`${this.url}${searchUri}`, {params})
      .pipe(
        switchMap(resp => {
          return of(resp.results);
        })
      );
  }

  getSimilarMovies(id: string) {
    return this.http.get<MovieDto>(`${this.url}/movie/${id}/similar`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 12));
        })
      );
  }

  getMoviesByGenre(id: string, page: number = 1) {
    return this.http.get<MovieDto>(`${this.url}/discover/movie?with_genres=${id}&page=${page}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
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

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.url}/movie/${id}/images`);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.url}/movie/${id}/credits`);
  }

  getMoviesGenres() {
    return this.http.get<GenresDto>(`${this.url}/genre/movie/list`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }
}
