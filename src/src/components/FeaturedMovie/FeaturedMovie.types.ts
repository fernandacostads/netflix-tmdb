export interface Genre {
  id: number;
  name: string;
}

export interface FeaturedMovieItem {
  id: number;
  original_name: string;
  original_title: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons: number;
  overview?: string;
  genres?: Genre[];
}

export interface FeaturedMovieProps {
  item: FeaturedMovieItem;
}
