"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MovieTrailer({ movieId }) {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          { params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY } }
        );
  
        const trailer = res.data?.results?.find(v => v.type === "Trailer");
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        console.error("Failed to fetch trailer:", err);
        setTrailerKey(null);
      }
    };
  
    fetchTrailer();
  }, [movieId]);
  

  if (!trailerKey) return <p className="text-gray-400 mt-4">Trailer not available</p>;

  return (
    <div className="mt-4">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Movie Trailer"
        allowFullScreen
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
}
