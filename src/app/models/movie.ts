export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  revenue: number;
  status: string;
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

export interface Genre {
  id: number;
  name: string;
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
  cast: Character[];
  crew: Character[];
}

export interface Character {
  id: number;
  adult: boolean;
  gender: number;
  name: string;
  profile_path: string;
  original_name: string;
  popularity: number;
  known_for_department: string;
  character?: string;
  department?: string;
  job?: string;
}