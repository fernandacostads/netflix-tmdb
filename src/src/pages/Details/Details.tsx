import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbService } from "../../services/tmdbService";
import type { FeaturedMovieItem } from "../../components/FeaturedMovie/FeaturedMovie.types";
import "./Details.css";

type MediaType = "movie" | "tv";

function isValidMediaType(type: string): type is MediaType {
  return type === "movie" || type === "tv";
}

export const Details: React.FC = () => {
  const { id, type } = useParams<{ id: string; type: string }>();
  const [item, setItem] = useState<FeaturedMovieItem | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      if (id && type && isValidMediaType(type)) {
        const movieData = await tmdbService.getMovieInfo(Number(id), type);
        setItem(movieData as FeaturedMovieItem);
      }
    };
    loadItem();
  }, [id, type]);

  if (!item) return null;

  return (
    <section
      className="details"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="details--vertical">
        <div className="details--horizontal">
          <h1 className="details--title">
            {item.original_name || item.original_title}
          </h1>
          <div className="details--info">
            <span className="details--year">
              {new Date(item.first_air_date || item.release_date).getFullYear()}
            </span>
            <span className="details--rating">{item.vote_average} pontos</span>
            {item.number_of_seasons && (
              <span className="details--seasons">
                {item.number_of_seasons} temporada
                {item.number_of_seasons > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <p className="details--description">{item.overview}</p>
          <div className="details--buttons">
            <button className="watch">▶ Assistir</button>
            <button className="mylist">+ Minha Lista</button>
          </div>
          <div className="details--genres">
            <strong>Gêneros:</strong>{" "}
            {item.genres && item.genres.map((g) => g.name).join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};
