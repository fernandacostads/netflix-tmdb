import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./src/pages/Home/Home";
import "./App.css";
import { Details } from "./src/pages/Details/Details";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </Router>
  );
};
