import MovieCard from "./components/MovieCard";
import { fetchMovies } from "./lib/tmdb";
import BannerSwiper from "./components/BannerSwiper";

export default async function Home() {
  let trendingMovies = [];
  let popularMovies = [];
  let newArrivalMovies = [];

  try {
    trendingMovies = await fetchMovies("trending/movie/week"); // TMDB trending endpoint
    popularMovies = await fetchMovies("popular");
    newArrivalMovies = await fetchMovies("upcoming"); // new arrivals
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }

  const renderSection = (title, movies, extraTopPadding = false) => (
    <section className={`mb-12 ${extraTopPadding ? "pt-8 md:pt-12" : ""}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-400">{title}</h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No movies available.</p>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Banner */}
      {trendingMovies.length > 0 && (
        <div className="mb-12 px-4 sm:px-6 md:px-10">
          <BannerSwiper movies={trendingMovies.slice(0, 5)} />
        </div>
      )}

      {/* Movie sections */}
      <div className="px-4 sm:px-6 md:px-10">
        {/* New Arrivals with extra top padding */}
        {renderSection("New Arrivals", newArrivalMovies, true)}

        {renderSection("Trending", trendingMovies)}
        {renderSection("Popular", popularMovies)}
      </div>
    </div>
  );
}
