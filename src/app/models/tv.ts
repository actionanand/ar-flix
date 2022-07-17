import { AudioLanguage, CharacterProfile, Genre, ProductionCompany, ProductionCountry } from './common';
import { Item } from './item';

export interface TvShow {
  backdrop_path: string;
  created_by: CreatedByProfile[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEp2AirObj[];
  name: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: AudioLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

export interface TvShowDto {
  page: number;
  results: TvShow[];
  total_results: number;
  total_pages: number;
};

export interface CreatedByProfile {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
};

export interface LastEp2AirObj {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
};

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export interface TvShowVideoDto {
  id: number;
  results: TvShowVideo[];
};

export interface TvShowVideo {
  site: string;
  key: string;
};

export interface TvShowImages {
  backdrops: {
    file_path: string;
  }[];
};

export interface TvShowCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
};

export interface MovieCredits {
  cast: CharacterProfile[];
  crew: CharacterProfile[];
};

export const mapTvShowToItem = (tvShow: TvShow): Item => {
  return {
    id: tvShow.id,
    title: tvShow.name,
    poster_path: tvShow.poster_path,
    vote_average: tvShow.vote_average,
    backdrop_path: tvShow.backdrop_path,
    vote_count: tvShow.vote_count,
    release_date: tvShow.first_air_date,
    overview: tvShow.overview,
    routePath: '/tv-show/' + tvShow.id
  };
};