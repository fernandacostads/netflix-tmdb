import type { HomeCategory } from "../../types/homeCategory";
import type { MediaItem } from "../../types/mediaItem";
import type { FeaturedMovieItem } from "../components/FeaturedMovie/FeaturedMovie.types";
import { api } from "./api";

const endpoints = {
  originals: `/discover/tv?with_network=213}`,
  trending: "/trending/all/week",
  toprated: "/movie/top_rated",
  action: "/discover/movie?with_genres=28",
  comedy: "/discover/movie?with_genres=35",
  horror: "/discover/movie?with_genres=27",
  romance: "/discover/movie?with_genres=10749",
  documentary: "/discover/movie?with_genres=99",
};

export const tmdbService = {
  async getHomeList(): Promise<HomeCategory[]> {
    const categories = [
      {
        slug: "originals",
        title: "Originais do Netflix",
        endpoint: endpoints.originals,
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        endpoint: endpoints.trending,
      },
      { slug: "toprated", title: "Em alta", endpoint: endpoints.toprated },
      { slug: "action", title: "Ação", endpoint: endpoints.action },
      { slug: "comedy", title: "Comédia", endpoint: endpoints.comedy },
      { slug: "horror", title: "Terror", endpoint: endpoints.horror },
      { slug: "romance", title: "Romance", endpoint: endpoints.romance },
      {
        slug: "documentary",
        title: "Documentários",
        endpoint: endpoints.documentary,
      },
    ];

    const requests = categories.map(async ({ slug, title, endpoint }) => {
      const { data } = await api.get<HomeCategory["items"]>(endpoint);
      return { slug, title, items: data };
    });

    return Promise.all(requests);
  },

  async getMovieInfo(
    id: number,
    type: "movie" | "tv"
  ): Promise<FeaturedMovieItem | null> {
    if (!id) return null;

    try {
      const { data } = await api.get<MediaItem>(`/${type}/${id}`);

      const adapted: FeaturedMovieItem = {
        id: data.id,
        original_name:
          data.original_name ||
          data.original_title ||
          data.name ||
          data.title ||
          "Nome não disponível",
        backdrop_path: data.backdrop_path,
        vote_average: data.vote_average,
        first_air_date:
          data.first_air_date || data.release_date || "0000-00-00",
        number_of_seasons: data.number_of_seasons || 1,
        overview: data.overview || "",
        genres: data.genres || [],
      };

      return adapted;
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      return null;
    }
  },
};
