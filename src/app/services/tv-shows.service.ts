import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { GenresDto } from '../models/common';
import { TvShow, TvShowCredits, TvShowDto, TvShowImages, TvShowVideoDto } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {

  url = env.baseUrl;

  constructor(private http: HttpClient) { }

  getTvShows(type: string = 'top_rated', count: number = 12) {
    return this.http.get<TvShowDto>(`${this.url}/tv/${type}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

  getTvShow(id: string) {
    return this.http.get<TvShow>(`${this.url}/tv/${id}`);
  }

  getTvShowVideos(id: string) {
    return this.http.get<TvShowVideoDto>(`${this.url}/tv/${id}/videos`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowsGenres() {
    return this.http.get<GenresDto>(`${this.url}/genre/tv/list`)
      .pipe(
        switchMap((res) => {
          return of(res.genres);
        })
      );
  }

  getTvShowsByGenre(genreId: string, pageNumber: number) {
    return this.http.get<TvShowDto>(`${this.url}/discover/tv?with_genres=${genreId}&page=${pageNumber}`)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(`${this.url}/tv/${id}/images`);
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(`${this.url}/tv/${id}/credits`);
  }

  getTvShowSimilar(id: string) {
    return this.http.get<TvShowDto>(`${this.url}/tv/${id}/similar`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 12));
        })
      );
  }

  searchTvShows(page: number = 1, searchTerm?: string) {
    let searchUri = '/tv/popular';
    let params = new HttpParams().set('page', page);

    if (searchTerm) {
      params = params.set('query', searchTerm);
      searchUri = '/search/tv';
    }

    return this.http.get<TvShowDto>(`${this.url}${searchUri}`, {params})
      .pipe(
        switchMap(resp => {
          return of(resp.results);
        })
      );
  }

  getTvs(type: string = 'latest', count: number = 12) {
    return this.http.get<TvShowDto>(`${this.url}/tv/${type}`)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, count));
        })
      );
  }

}
