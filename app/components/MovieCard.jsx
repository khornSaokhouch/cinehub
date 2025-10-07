import Link from "next/link";
import { Star, Eye } from "lucide-react";

const MovieCard = ({ movie }) => {
  if (!movie) return null; // Prevent rendering if movie is undefined

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `https://placehold.co/500x750/333/fff?text=Poster+Unavailable`;

  const ratingColor =
    movie.vote_average >= 8
      ? "bg-green-600"
      : movie.vote_average >= 7
      ? "bg-yellow-600"
      : "bg-red-600";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block group relative w-full overflow-hidden rounded-xl 
                 shadow-lg transition-all duration-300 ease-in-out 
                 hover:shadow-2xl hover:shadow-indigo-500/50 
                 hover:-translate-y-1 bg-gray-800"
      style={{ aspectRatio: "2/3" }}
    >
      {/* Poster Image */}
      <img
        src={imageUrl}
        alt={movie.title ?? "Movie Poster"}
        className="w-full h-full object-cover transition-all duration-500 
                   group-hover:scale-105 group-hover:opacity-90"
      />

      {/* Rating Badge */}
      {movie.vote_average !== undefined && (
        <div
          className={`absolute top-3 right-3 flex items-center p-2 rounded-full text-white font-bold text-xs ${ratingColor} shadow-md`}
        >
          <Star className="w-3 h-3 fill-current text-yellow-300 mr-1" />
          {movie.vote_average.toFixed(1)}
        </div>
      )}

      {/* Title Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <h3 className="text-white text-base font-semibold truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
          {movie.title ?? "Unknown Title"}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : "-"}
        </p>
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-3 bg-indigo-600 rounded-full text-white flex items-center space-x-2 shadow-xl">
          <Eye className="w-5 h-5" />
          <span className="font-medium text-sm">View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
