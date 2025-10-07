"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Star, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchMovies } from "../lib/tmdb"; // Adjust path as needed

const BannerSlider = ({ movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = movies.length;

  useEffect(() => {
    if (totalSlides === 0) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex, totalSlides]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const movie = movies[activeIndex];
  if (!movie) return null;

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] rounded-xl overflow-hidden shadow-2xl mb-8">
      <img
        key={movie.id}
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/1200x600/333/fff?text=Banner+Unavailable";
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 md:p-10 flex flex-col justify-end">
        <div className="max-w-4xl">
          <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 transition-opacity duration-500">
            {movie.title}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4 md:mb-6 max-w-lg transition-opacity duration-500">
            {movie.overview?.slice(0, 150)}...
          </p>
          <button className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transition duration-300 text-xs sm:text-sm md:text-base">
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Watch Trailer</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 md:p-4 bg-black/50 hover:bg-black/70 rounded-r-lg text-white transition duration-300 focus:outline-none"
        >
          <ChevronLeft className="w-4 sm:w-6 h-4 sm:h-6" />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 md:p-4 bg-black/50 hover:bg-black/70 rounded-l-lg text-white transition duration-300 focus:outline-none"
        >
          <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-3 sm:bottom-5 inset-x-0 flex justify-center space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-indigo-500 w-6 sm:w-8" : "bg-gray-400 hover:bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function HomeBanner() {
  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      try {
        const movies = await fetchMovies("trending/movie/week"); // Trending this week
        setBannerMovies(movies.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch banner movies:", err);
      }
    }
    loadTrending();
  }, []);

  return (
    <div className="w-full bg-gray-900 text-white font-sans px-4 sm:px-6 md:px-10">
      {bannerMovies.length > 0 && <BannerSlider movies={bannerMovies} />}
    </div>
  );
}
