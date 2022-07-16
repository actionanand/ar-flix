import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { first, Subscription } from 'rxjs';

import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { CAROUSEL_RESPONSIVE_CONST } from './carousel-reponsive-constant';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  readonly imagesSizes = IMAGES_SIZES;
  readonly manPlaceholderImg = env.manPlaceholderImg;

  responsiveOptions = CAROUSEL_RESPONSIVE_CONST;

  paramSub!: Subscription;

  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  similarMovies: Movie[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;

  constructor(private route: ActivatedRoute, private moviesServ: MoviesService) { }

  onGetMovieDetail(id: string) {
    this.moviesServ.getMovie(id).subscribe(resp => {
      this.movie = resp;
    });
  }

  onGetMovieVideos(id: string) {
    this.moviesServ.getMovieVideos(id).subscribe(resp => {
      this.movieVideos = resp;
    });
  }

  onGetMovieImages(id: string) {
    this.moviesServ.getMovieImages(id).subscribe(resp => {
      this.movieImages = resp;
    });
  }

  onGetMovieCredits(id: string) {
    this.moviesServ.getMovieCredits(id).subscribe(resp => {
      this.movieCredits = resp;
    });
  }

  onGetSililarMovies(id: string) {
    this.moviesServ.getSimilarMovies(id).subscribe(resp => {
      this.similarMovies = resp;
    });
  }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(({ id }) => {
      this.onGetMovieDetail(id);
      this.onGetMovieVideos(id);
      this.onGetMovieImages(id);
      this.onGetMovieCredits(id);
      this.onGetSililarMovies(id);
    });
  }

  ngOnDestroy(): void {
    this.paramSub && this.paramSub.unsubscribe();
  }

}
