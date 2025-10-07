import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../lib/tmdb";

export default async function TrendingPage() {
  let trendingMovies = [];

  try {
    trendingMovies = await fetchMovies("trending/movie/week");
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-indigo-400 text-center">
        Trending Movies
      </h1>

      {trendingMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No trending movies available.</p>
      )}
    </div>
  );
}
