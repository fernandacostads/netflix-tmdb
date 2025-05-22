import axios from "axios";
import { TMDB_API_KEY, TMDB_API_BASE } from "../config";

export const api = axios.create({
  baseURL: TMDB_API_BASE,
  params: {
    api_key: TMDB_API_KEY,
    language: "pt-BR",
  },
});
