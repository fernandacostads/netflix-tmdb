import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import type { MovieRowProps } from "./MovieRow.types";
import { useNavigate } from "react-router-dom";

export const MovieRow: React.FC<MovieRowProps> = ({ title, items, type }) => {
  const navigate = useNavigate();
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listW = items.results.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  const handleClick = (id: number) => {
    navigate(`/details/${type}/${id}`);
  };

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handleLeftArrow}>
        <NavigateBeforeIcon style={{ fontSize: 50 }} />
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
        <NavigateNextIcon style={{ fontSize: 50 }} />
      </div>

      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={{
            marginLeft: scrollX,
            width: items.results.length * 150,
          }}
        >
          {items.results.length > 0 &&
            items.results.map((item, key) => {
              const title =
                item.original_title ||
                item.original_name ||
                "Título não disponível";
              return (
                <div
                  key={key}
                  className="movieRow--item"
                  onClick={() => handleClick(item.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={title}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
