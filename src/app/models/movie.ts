import { AudioLanguage, CharacterProfile, Genre, ProductionCompany, ProductionCountry } from "./common";
import { Item } from "./item";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  runtime: number;
  revenue: number;
  spoken_languages: AudioLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// DTO - Data Transfer Object
export interface MovieDto {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
};

export interface MovieVideoDto {
  id: number;
  results: MovieVideo[];
};

export interface MovieVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
  'iso_639_1': string;
  'iso_3166_1': string;
};

export interface MovieImages {
  backdrops: {
    file_path: string;
  }[];
};


export interface MovieCredits {
  cast: CharacterProfile[];
  crew: CharacterProfile[];
};


// mapping to make 'item' component generic
export const mapMovieToItem = (movie: Movie): Item => {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    vote_average: movie.vote_average,
    backdrop_path: movie.backdrop_path,
    vote_count: movie.vote_count,
    release_date: movie.release_date,
    overview: movie.overview,
    routePath: '/movie/' + movie.id
  };
};