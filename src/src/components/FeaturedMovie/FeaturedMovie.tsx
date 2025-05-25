import React from "react";
import "./FeaturedMovie.css";
import type { FeaturedMovieProps } from "./FeaturedMovie.types";

export const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ item }) => {
  const firstDate = item.first_air_date ? new Date(item.first_air_date) : null;

  const genres = item.genres ? item.genres.map((genre) => genre.name) : [];

  let description = item.overview || "";
  if (description.length > 400) {
    description = description.substring(0, 400) + "...";
  }

  return (
    <section
      className="featured"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">
              {item.vote_average.toFixed(1)} pontos
            </div>
            <div className="featured--year">
              {firstDate ? firstDate.getFullYear() : "N/A"}
            </div>
            <div className="featured--seasons">
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="featured--description">{description}</div>
          <div className="featured--buttons">
            <a href={`/watch/${item.id}`} className="featured--watchbutton">
              ► Assistir
            </a>
            <a href={`/list/add/${item.id}`} className="featured--mylistbutton">
              + Minha Lista
            </a>
          </div>
          <div className="featured--genres">
            <strong>Gêneros: {genres.join(", ")}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
