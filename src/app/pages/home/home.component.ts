import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: any = [];

  constructor(private moviesServ: MoviesService) { }

  ngOnInit(): void {
    this.moviesServ.getMovies().subscribe(resp => {
      this.movies = resp;
      console.log(this.movies);
    })
  }

}
