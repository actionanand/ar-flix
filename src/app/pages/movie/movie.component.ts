import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  movie: Movie | null = null;

  constructor(private route: ActivatedRoute, private moviesServ: MoviesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.moviesServ.getMovie(id).subscribe(resp => {
        this.movie = resp;
      })
    });
  }

}
