import React from "react";
import "./Header.css";
import type { HeaderProps } from "./Header.types";

export const Header: React.FC<HeaderProps> = ({ black }) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
            alt="NetFlix"
          />
        </a>
      </div>
      <div className="header--user">
        <a href="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="usuario"
          />
        </a>
      </div>
    </header>
  );
};
