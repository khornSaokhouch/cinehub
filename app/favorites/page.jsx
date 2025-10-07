"use client"; // Required for localStorage and useState/useEffect

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage after hydration
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-white">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-400">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="hover:scale-105 transition transform cursor-pointer relative"
            >
              <Link href={`/movie/${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-700 h-[300px] rounded-lg flex items-center justify-center text-white">
                    No Image
                  </div>
                )}
                <p className="mt-2 text-center text-white">{movie.title}</p>
              </Link>

              <button
                onClick={() => removeFavorite(movie.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 text-xs hover:bg-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
