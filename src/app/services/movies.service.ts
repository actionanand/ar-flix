import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { MovieDto } from '../models/movie';

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
          return of(resp.results);
        })
      );
  }
}
