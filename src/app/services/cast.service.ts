import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of, switchMap } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { ExternalId, MovieAndTvCredits, Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class CastService {

  url = env.baseUrl;

  constructor(private http: HttpClient) { }


  getPersonDetail(id: string){
    return this.http.get<Person>(`${this.url}/person/${id}`);
  }

  getPersonExternalData(id: string) {
    return this.http.get<ExternalId>(`${this.url}/person/${id}/external_ids`);
  }

  getPersonMovieCredit(id: string) {
    return this.http.get<MovieAndTvCredits>(`${this.url}/person/${id}/movie_credits`)
      .pipe(
        switchMap(resp => {
          return of(resp.cast.slice(0, 12));
        })
      );
  }

}
