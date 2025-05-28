import React, { useEffect, useState, useCallback } from "react";
import type { HomeCategory } from "../../../types/homeCategory";
import { tmdbService } from "../../services/tmdbService";
import { Header } from "../../components/Header/Header";
import { FeaturedMovie } from "../../components/FeaturedMovie/FeaturedMovie";
import { MovieRow } from "../../components/MovieRow/MovieRow";
import type { FeaturedMovieItem } from "../../components/FeaturedMovie/FeaturedMovie.types";
import "./Home.css";

export const Home: React.FC = () => {
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

      const randomCategoryIndex = Math.floor(Math.random() * list.length);
      const category = list[randomCategoryIndex];

      if (category.items.results.length > 0) {
        const randomItemIndex = Math.floor(
          Math.random() * category.items.results.length
        );
        const chosen = category.items.results[randomItemIndex];

        const chosenInfo = await tmdbService.getMovieInfo(
          chosen.id,
          chosen.media_type === "tv" ? "tv" : "movie"
        );

        if (chosenInfo?.original_name) {
          setFeaturedData(chosenInfo);
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
          <MovieRow
            key={slug}
            title={title}
            items={items}
            type={slug === "originals" ? "tv" : "movie"}
          />
        ))}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          🧡
        </span>
        <br />
        Direitos de imagem para Netflix
        <br />
        Dados pegos do site Themoviedb.org - B7Web
      </footer>

      {isLoading && (
        <div className="loading">
          <img
            src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2_w200.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};
