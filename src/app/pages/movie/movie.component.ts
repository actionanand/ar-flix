import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Subscription } from 'rxjs';

import { IMAGES_SIZES } from '../../shared/constants/images-sizes';
import { mapMovieToItem, Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import { CAROUSEL_RESPONSIVE_CONST } from '../../shared/constants/carousel-reponsive-constant';
import { Item } from '../../models/item';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  readonly imagesSizes = IMAGES_SIZES;
  readonly manPlaceholderImg: SafeUrl = this.onSanitizeUrl(env.manPlaceholderImg);
  idmbUrl: SafeUrl = this.onSanitizeUrl(env.idmbUrl);

  responsiveOptions = CAROUSEL_RESPONSIVE_CONST;

  paramSub!: Subscription;

  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  similarMovies: Item[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;

  showCompany: boolean = false;

  constructor(private route: ActivatedRoute, private moviesServ: MoviesService, private sanitizer: DomSanitizer) { }

  onGetMovieDetail(id: string) {
    this.moviesServ.getMovie(id).subscribe(resp => {
      this.movie = resp;
      this.idmbUrl = this.onSanitizeUrl(`${env.idmbUrl}/${this.movie.imdb_id}`);
      if (this.movie?.production_companies?.length > 3) {
        this.showCompany = true;
      }
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

  onGetSimilarMovies(id: string) {
    this.moviesServ.getSimilarMovies(id).subscribe(resp => {
      this.similarMovies = resp.map(movie => mapMovieToItem(movie));
    });
  }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(({ id }) => {
      this.onGetMovieDetail(id);
      this.onGetMovieVideos(id);
      this.onGetMovieImages(id);
      this.onGetMovieCredits(id);
      this.onGetSimilarMovies(id);
    });
  }

  ngOnDestroy(): void {
    this.paramSub && this.paramSub.unsubscribe();
  }

  private onSanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url)
  }

}
