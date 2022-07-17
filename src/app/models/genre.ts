export interface Genre {
  id: number;
  name: string;
};

export interface GenresDto {
  genres: Genre[];
};