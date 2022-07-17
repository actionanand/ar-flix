import { Component, OnInit } from '@angular/core';

import { Genre } from '../../models/common';
import { MoviesService } from '../../services/movies.service';
import { TvShowsService } from '../../services/tv-shows.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  genres: Genre[] = [];
  genresTv: Genre[] = [];
  
  constructor(private moviesServ: MoviesService, private tvServ: TvShowsService) { }

  ngOnInit(): void {
    this.moviesServ.getMoviesGenres().subscribe(resp => {
      this.genres = resp;
    });

    this.tvServ.getTvShowsGenres().subscribe(resp => {
      this.genresTv = resp;
    });
  }

}
