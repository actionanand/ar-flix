import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/movie';

import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  
  genres: Genre[] = [];
  
  constructor(private moviesServ: MoviesService,) { }

  ngOnInit(): void {
    this.moviesServ.getMoviesGenres().subscribe(resp => {
      this.genres = resp;
    });
  }

}
