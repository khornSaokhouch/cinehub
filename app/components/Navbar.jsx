"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";

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
      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center border-2 border-red-400 transition duration-300 group-hover:bg-red-700 group-hover:shadow-lg group-hover:shadow-red-500/50 cursor-pointer">
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
  const [menuOpen, setMenuOpen] = useState(false);

  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser)
      setUser({ ...JSON.parse(savedUser), name: JSON.parse(savedUser).name || "User" });
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

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

  const navItems = ["Home", "About", "New Arrivals", "Trending", "Popular"];

  // ✅ Helper for correct href
  const getHref = (item) =>
    item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;

  return (
    <nav className="bg-gray-950 text-white px-4 py-3 flex flex-wrap items-center justify-between shadow-2xl z-50 sticky top-0 border-b border-red-800/20">
      {/* LEFT: Hamburger + Logo */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {/* Hamburger (Mobile only) */}
        <button
          className="md:hidden text-white hover:text-red-500 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link href="/">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 tracking-wider hover:text-red-400 transition duration-300">
            CINEHUB
          </h1>
        </Link>
      </div>

      {/* CENTER: Navigation (Desktop only) */}
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item}
            href={getHref(item)}
            className="text-gray-300 hover:text-red-600 transition duration-300 text-base font-medium relative group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </Link>
        ))}
      </div>

      {/* RIGHT: Search + Profile/Login */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 w-auto md:w-auto mt-3 md:mt-0 flex-nowrap justify-end">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex w-[140px] xs:w-[180px] sm:w-[220px] md:w-[250px] bg-gray-800 rounded-full overflow-hidden border border-gray-700 focus-within:ring-2 focus-within:ring-red-600 transition duration-300"
        >
          <input
            type="text"
            placeholder={loading ? "..." : "Search..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-1.5 w-full bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            className="px-3 bg-red-600 hover:bg-red-700 transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-t-2 border-white border-t-red-400 rounded-full animate-spin mx-auto"></div>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            )}
          </button>
        </form>

        {/* Profile / Login */}
        {user ? (
          <InitialAvatar user={user} />
        ) : (
          <Link
            href="/auth/login"
            className="bg-red-600 px-3 py-1.5 rounded-full font-semibold hover:bg-red-700 transition duration-300 text-sm shadow-lg flex-shrink-0"
          >
            Login
          </Link>
        )}
      </div>

      {/* MOBILE MENU (Dropdown) */}
      {menuOpen && (
        <div className="w-full mt-3 flex flex-col bg-gray-900 border border-gray-800 rounded-lg md:hidden">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getHref(item)}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 text-gray-300 hover:text-white hover:bg-red-700/40 transition"
            >
              {item}
            </Link>
          ))}
        </div>
      )}

      {/* Search Results Dropdown */}
      {results.length > 0 && query.length > 0 && (
        <div className="absolute left-0 right-0 top-[100%] mt-2 mx-4 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl max-h-80 overflow-y-auto z-50">
          {results.slice(0, 10).map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`} onClick={handleResultClick}>
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
    </nav>
  );
}
