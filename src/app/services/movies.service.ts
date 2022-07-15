import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getMovies(type: string = 'popular') {
    return this.http.get(this.url + '/movie/' + type);
  }
}
