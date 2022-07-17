import { Component, OnInit } from '@angular/core';

import { mapMovieToItem } from '../../models/movie';
import { Item } from '../../models/item';
import { MoviesService } from '../../services/movies.service';
import { TvShowsService } from '../../services/tv-shows.service';
import { mapTvShowToItem } from '../../models/tv';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularMovies: Item[] = [];
  upcomingMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  onTheAirTv: Item[] = [];

  // movies: Movie[] = [];

  constructor(private moviesServ: MoviesService, private tvServ: TvShowsService) { }

  ngOnInit(): void {
    this.moviesServ.getMovies().subscribe(resp => {
      this.popularMovies = resp.map(movie => mapMovieToItem(movie));
      // console.log(this.popularMovies);
    });

    this.moviesServ.getMovies('now_playing').subscribe(resp => {
      this.upcomingMovies = resp.map(movie => mapMovieToItem(movie));
    });

    this.moviesServ.getMovies('top_rated').subscribe(resp => {
      this.topRatedMovies = resp.map(movie => mapMovieToItem(movie));
    });

    this.tvServ.getTvShows('on_the_air').subscribe(resp => {
      this.onTheAirTv = resp.map(tvShow => mapTvShowToItem(tvShow));
    });
  }

}
