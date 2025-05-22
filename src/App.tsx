import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import type { HomeCategory } from "./types/homeCategory";
import { tmdbService } from "./src/services/tmdbService";
import { Header } from "./src/components/Header/Header";
import { FeaturedMovie } from "./src/components/FeaturedMovie/FeaturedMovie";
import { MovieRow } from "./src/components/MovieRow/MovieRow";
import type { FeaturedMovieItem } from "./src/components/FeaturedMovie/FeaturedMovie.types";

export const App: React.FC = () => {
  const [movieList, setMovieList] = useState<HomeCategory[]>([]);
  const [featuredData, setFeaturedData] = useState<FeaturedMovieItem | null>(
    null
  );

  const [blackHeader, setBlackHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadHomeList = useCallback(async () => {
    setIsLoading(true);
    try {
      const list = await tmdbService.getHomeList();
      setMovieList(list);

      const originals = list.find((category) => category.slug === "originals");
      if (originals && originals.items.results.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * originals.items.results.length
        );
        const chosen = originals.items.results[randomIndex];
        const chosenInfo = await tmdbService.getMovieInfo(chosen.id, "tv");
        if (chosenInfo && chosenInfo.original_name) {
          setFeaturedData(chosenInfo as FeaturedMovieItem);
        } else {
          setFeaturedData(null);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar lista:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomeList();
  }, [loadHomeList]);

  useEffect(() => {
    const handleScroll = () => {
      setBlackHeader(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map(({ slug, title, items }) => (
          <MovieRow key={slug} title={title} items={items} />
        ))}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          🧡
        </span>{" "}
        pela B7Web
        <br />
        Direitos de imagem para Netflix
        <br />
        Dados pegos do site Themoviedb.org
      </footer>

      {isLoading && (
        <div className="loading">
          <img
            src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};
