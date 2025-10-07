"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// --- Avatar Component ---
const InitialAvatar = ({ user }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    let initials = parts[0].charAt(0);
    if (parts.length > 1) initials += parts[parts.length - 1].charAt(0);
    return initials.toUpperCase();
  };

  const initials = getInitials(user?.name);

  return (
    <Link href={`/profile/${user.id}`} className="flex items-center group relative">
      <div className="w-10 h-10 relative overflow-hidden rounded-full bg-red-600 flex items-center justify-center border-2 border-red-400 transition duration-300 group-hover:bg-red-700 group-hover:shadow-lg group-hover:shadow-red-500/50 flex-shrink-0 cursor-pointer">
        <span className="text-white text-base font-bold select-none">{initials}</span>
      </div>

      <span className="absolute right-0 top-12 z-50 bg-gray-700 text-white text-xs p-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {user.name} Profile
      </span>
    </Link>
  );
};

// --- Navbar Component ---
export default function Navbar() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage
  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser({ ...JSON.parse(savedUser), name: JSON.parse(savedUser).name || "User" });
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Search TMDB
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
          api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
          query,
        },
      });
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <nav className="bg-gray-950 text-white p-4 flex flex-wrap justify-between items-center gap-y-3 shadow-2xl z-50 sticky top-0 border-b border-red-800/20">
      {/* Left: Logo + Links */}
      <div className="flex items-center gap-6 sm:w-auto order-1">
        <Link href="/">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 tracking-wider hover:text-red-400 transition duration-300">
            CINEHUB
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-300 hover:text-red-600 transition duration-300 text-base font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-red-600 transition duration-300 text-base font-medium relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/new-arrivals"
            className="text-gray-300 hover:text-red-600 transition duration-300 text-base font-medium relative group"
          >
            New Arrivals
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/trending"
            className="text-gray-300 hover:text-red-600 transition duration-300 text-base font-medium relative group"
          >
            Trending
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
          <Link
            href="/popular"
            className="text-gray-300 hover:text-red-600 transition duration-300 text-base font-medium relative group"
          >
            Popular
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        </div>
      </div>

      {/* Right: Profile/Login */}
      <div className="flex items-center order-2 ml-auto md:order-3 md:ml-0">
        {user ? (
          <InitialAvatar user={user} />
        ) : (
          <Link
            href="/auth/login"
            className="bg-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 text-sm shadow-lg flex-shrink-0"
          >
            Login
          </Link>
        )}
      </div>

      {/* Middle: Search */}
      <div className="relative order-3 md:order-2 w-full md:w-1/2 lg:w-1/3 md:mx-auto mt-2 md:mt-0">
        <form onSubmit={handleSearch} className="flex w-full">
          <input
            type="text"
            placeholder={loading ? "Searching..." : "Search movies..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 pl-4 rounded-l-full text-gray-100 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 w-full transition duration-300 placeholder-gray-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-red-600 p-2 px-4 rounded-r-full text-white hover:bg-red-700 transition duration-300 flex items-center justify-center disabled:opacity-50 flex-shrink-0"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-t-2 border-white border-t-red-400 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            )}
          </button>
        </form>

        {/* Search results dropdown */}
        {results.length > 0 && query.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-80 overflow-y-auto z-50">
            {results.slice(0, 10).map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                onClick={handleResultClick}
              >
                <div className="p-3 text-sm border-b border-gray-700 last:border-b-0 hover:bg-gray-700 transition duration-150 cursor-pointer flex justify-between items-center">
                  <span className="truncate">{movie.title}</span>
                  {movie.release_date && (
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                      ({new Date(movie.release_date).getFullYear()})
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
