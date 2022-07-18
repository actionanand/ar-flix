import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, take } from 'rxjs';

import { TvShowsService } from '../../services/tv-shows.service';
import { Item } from '../../models/item';
import { mapMovieToItem } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { mapTvShowToItem } from '../../models/tv';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  items: Item[] = [];
  genreId: string | null = null;
  searchTerm: string = '';
  tvOrMovie: string = 'movie';
  title: string = '';

  // this api will support max of 500 pages. so 500 x 20 = 10,000
  totalRecords: number = 10000;

  constructor(private moviesServ: MoviesService, private route: ActivatedRoute, private tvServ: TvShowsService) { }

  getPagedMovies(page: number = 1, searchTerm: string = '') {
    this.moviesServ.searchMovies(page, searchTerm).subscribe(resp => {
      this.items = resp.map(movie => mapMovieToItem(movie));
    });
  }

  getMoviesByGenre(id: string, page: number = 1) {
    this.moviesServ.getMoviesByGenre(id, page).subscribe(resp => {
      this.items = resp.map(movie => mapMovieToItem(movie));
    });
  }

  getPagedTvShows(page: number = 1, searchTerm: string = '') {
    this.tvServ.searchTvShows(page, searchTerm).subscribe(resp => {
      this.items = resp.map(tv => mapTvShowToItem(tv));
    });
  }

  getTvByGenre(id: string, page: number = 1) {
    this.tvServ.getTvShowsByGenre(id, page).subscribe(resp => {
      this.items = resp.map(tv => mapTvShowToItem(tv));
    });
  }

  initializeMovies() {
    this.route.params.pipe(first()).subscribe(({genreId}) => {
      this.genreId = genreId;
      if (genreId) {
        this.getMoviesByGenre(genreId);
      } else {
        this.getPagedMovies();
      }
    });
  }

  initializeTvShows() {
    this.route.params.pipe(take(1)).subscribe(({genreId}) => {
      this.genreId = genreId;
      if (genreId) {
        this.getTvByGenre(genreId);
      } else {
        this.getPagedTvShows();
      }
    });
  }

  ngOnInit(): void {
    this.route.data.pipe(first()).subscribe(({id, name}) => {
      this.title = name;
      this.tvOrMovie = id;
      if(this.tvOrMovie === 'movie'){
        this.initializeMovies();
      } else {
        this.initializeTvShows();
      }
    });

    if (history.state?.title && this.tvOrMovie === 'movie') {
      this.changeTitle(`Movies Category - '${history.state?.title}'`);
    } else if (history.state?.title) {
      this.changeTitle(`Tv Shows Category - '${history.state?.title}'`);
    }

  }

  changeTitle(name: string) {
    this.title = name;
  }

  onSearchChange() {
    if (this.tvOrMovie === 'movie') {
      this.getPagedMovies(1, this.searchTerm.trim());
      this.searchTerm.trim() && this.changeTitle(`Results for '${this.searchTerm.trim()}' - Movies`);
    } else {
      this.getPagedTvShows(1, this.searchTerm.trim());
      this.searchTerm.trim() && this.changeTitle(`Results for '${this.searchTerm.trim()}' - Tv Shows`);
    }
  }

  paginateMovies(pageNumber: number) {
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      this.getPagedMovies(pageNumber, this.searchTerm.trim());
    }
  }

  paginateTvShows(pageNumber: number) {
    if (this.genreId) {
      this.getTvByGenre(this.genreId, pageNumber);
    } else {
      this.getPagedTvShows(pageNumber, this.searchTerm.trim());
    }
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.tvOrMovie === 'movie') {
      this.paginateMovies(pageNumber);
    } else {
      this.paginateTvShows(pageNumber);
    }
  }

}
