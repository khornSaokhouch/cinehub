"use client";
import React, { useState } from "react";
import { Heart } from "lucide-react";

export default function FavoritesButton({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button
      onClick={() => setIsFavorite(!isFavorite)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition duration-300 shadow-xl ${
        isFavorite
          ? "bg-red-600 hover:bg-red-700 text-white transform hover:scale-[1.03]"
          : "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600"
      }`}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
      <span>{isFavorite ? "Saved" : "Save to Favorites"}</span>
    </button>
  );
}
