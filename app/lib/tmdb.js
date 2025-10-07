// app/lib/tmdb.js
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch movies by category
export const fetchMovies = async (category = "popular") => {
  let url = "";

  switch (category) {
    case "trending":
      url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
      break;
    case "popular":
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      break;
    case "new":
      url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
      break;
    case "upcoming":
      url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
      break;
    default:
      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  }

  const res = await axios.get(url);
  return res.data.results;
};

// Fetch a single movie by ID
export const fetchMovieById = async (id) => {
  const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
  return res.data;
};

// Fetch movie videos (trailers)
export async function fetchMovieVideos(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results || [];
}
