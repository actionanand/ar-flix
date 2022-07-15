import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  readonly imagesSizes = IMAGES_SIZES;

  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];

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

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.onGetMovieDetail(id);
      this.onGetMovieVideos(id);
    });
  }

}
