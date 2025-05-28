import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { tmdbService } from "../../services/tmdbService";
import type { FeaturedMovieItem } from "../../components/FeaturedMovie/FeaturedMovie.types";

export const Details = () => {
  const { id, type } = useParams();
  const [item, setItem] = useState<FeaturedMovieItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id && type && (type === "movie" || type === "tv")) {
        const data = await tmdbService.getMovieInfo(Number(id), type);
        setItem(data);
      }
    };

    fetchData();
  }, [id, type]);

  if (!item) return <div>Carregando...</div>;

  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>{item.original_name || item.original_title}</h1>
      <p>{item.overview}</p>
      <p>Nota: {item.vote_average}</p>
      {item.genres?.map((g) => (
        <span key={g.id}>{g.name} </span>
      ))}
    </div>
  );
};
