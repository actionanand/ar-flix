import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { PageTitleStrategyService } from './services/page-title-strategy.service';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { MovieComponent } from './pages/movie/movie.component';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: MoviesComponent,
    title: 'Movies List'
  },
  {
    path: 'movies/categories/:genreId',
    component: MoviesComponent,
    title:'Movies List By Categories'
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    title:'Movie Detail'
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    title: 'Movies & Tv shows Categories'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: TitleStrategy,  useClass: PageTitleStrategyService}]
})
export class AppRoutingModule {}
