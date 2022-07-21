import { Item } from "./item";

export interface Person {
  birthday: string | null;
  known_for_department: string;
  deathday: string | null;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: number;
  homepage: string | null;
};

export interface MovieAndTvCredits {
  cast: CastAndCrew[];
  crew: CastAndCrew[];
  id: number;
};

export interface CastAndCrew {
  credit_id: string;
  release_date: string;
  vote_count: number;
  video: boolean;
  adult: boolean;
  vote_average: number;
  title: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  character?: string;
  job?: string;
  department?: string;
};

export interface ExternalId {
  imdb_id: string;
  facebook_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvrage_id: number;
  twitter_id: string;
  id: number;
  instagram_id: string;
};

export const mapMovieAndTvCreditsToItem = (movie: CastAndCrew): Item => {
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
