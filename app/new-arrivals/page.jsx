import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../lib/tmdb";

export default async function NewArrivalsPage() {
  let newArrivalMovies = [];

  try {
    newArrivalMovies = await fetchMovies("upcoming");
  } catch (error) {
    console.error("Failed to fetch new arrivals:", error);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-indigo-400 text-center">
        New Arrivals
      </h1>

      {newArrivalMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {newArrivalMovies.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No new arrivals available.</p>
      )}
    </div>
  );
}
