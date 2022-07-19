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
  backdrop_path: string | null;
  overview: string;
  poster_path: string | null;
  character?: string;
  job?: string;
  department?: string;
};
