export interface Genre {
  id: number;
  name: string;
};

export interface GenresDto {
  genres: Genre[];
};

export interface ProductionCompany {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
};

export interface ProductionCountry {
  'iso_3166_1': string;
  name: string;
};

export interface AudioLanguage {
  'iso_639_1': string;
  name: string;
  english_name?: string;
};

export interface CharacterProfile {
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
};