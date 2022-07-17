import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { PageTitleStrategyService } from './services/page-title-strategy.service';
import { HomeComponent } from './pages/home/home.component';
import { ResultsComponent } from './pages/results/results.component';
import { MovieComponent } from './pages/movie/movie.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TvShowComponent } from './pages/tv-show/tv-show.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'movies',
    component: ResultsComponent,
    title: 'Movies List',
    data :{ id: 'movie', name: 'All Movies' }
  },
  {
    path: 'tv-shows',
    component: ResultsComponent,
    title: 'Tv Shows List',
    data :{ id: 'tv-show', name: 'All Tv Shows' }
  },
  {
    path: 'movies/categories/:genreId',
    component: ResultsComponent,
    title:'Movies List By Categories',
    data :{ id: 'movie', name: 'Movies By Categories' }
  },
  {
    path: 'tv-shows/categories/:genreId',
    component: ResultsComponent,
    title:'Tv Shows List By Categories',
    data :{ id: 'tv-show', name: 'Tv Shows By Categories' }
  },
  {
    path: 'movie/:id',
    component: MovieComponent,
    title:'Movie Detail'
  },
  {
    path: 'tv-show/:id',
    component: TvShowComponent,
    title:'Tv Show Detail'
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
