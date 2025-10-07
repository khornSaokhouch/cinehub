// app/movie/[id]/page.jsx
import FavoritesButton from "../../components/FavoritesButton";
import MovieTrailer from "../../components/MovieTrailer";
import { fetchMovieById, fetchMovieVideos } from "../../lib/tmdb";
import { Star, Play } from "lucide-react";

export default async function MovieDetailPage({ params }) {
  const movieId = params.id; // ✅ just access it, do NOT await

  let movie = null;
  let videos = [];

  try {
    movie = await fetchMovieById(movieId);
    videos = await fetchMovieVideos(movieId);
  } catch (err) {
    console.error("Failed to fetch movie:", err);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Movie not found.</p>
      </div>
    );
  }

  const trailer = videos.find(v => v.type === "Trailer" && v.site === "YouTube");

  const ratingColor =
    movie.vote_average >= 8
      ? "bg-green-600"
      : movie.vote_average >= 7
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header / Backdrop */}
      <div className="relative pt-16 pb-16">
        {movie.backdrop_path && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* Poster */}
            <div className="flex-shrink-0 w-full md:w-80 h-auto self-stretch">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : `https://placehold.co/500x750/333/fff?text=Poster+Unavailable`
                }
                alt={movie.title}
                className="w-full h-auto rounded-xl shadow-2xl shadow-indigo-900/50 border-4 border-indigo-600/50 transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>

            {/* Details */}
            <div className="flex flex-col flex-grow pt-4 md:pt-0">
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-2 text-indigo-400 leading-tight">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-xl italic text-gray-400 mb-8">{movie.tagline}</p>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center space-x-4 mb-8 p-3 bg-gray-800/70 rounded-lg border border-gray-700">
                <div
                  className={`flex items-center space-x-1 px-4 py-2 rounded-full text-white font-bold text-base ${ratingColor} shadow-lg`}
                >
                  <Star className="w-5 h-5 fill-current text-yellow-300" />
                  <span>{movie.vote_average.toFixed(1)} / 10</span>
                </div>
                <span className="text-lg text-gray-300">
                  <span className="font-semibold">Released:</span> {movie.release_date}
                </span>
                <span className="text-lg text-gray-300 px-3 py-1 rounded-full bg-gray-700">
                  {movie.runtime} min
                </span>
              </div>

              {/* Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3 text-white border-b border-gray-700 pb-1">
                  Synopsis
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">{movie.overview}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <FavoritesButton movie={movie} />
                <button className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition duration-300 bg-indigo-700 hover:bg-indigo-800 text-white border border-indigo-600 shadow-xl">
                  <Play className="w-5 h-5 fill-current" />
                  <span>Stream Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trailer Section */}
          {trailer && <MovieTrailer movieId={movieId} />}
        </div>
      </div>
    </div>
  );
}
