import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    // Footer uses the same deep background and shadow for consistency
    <footer className="bg-gray-950 text-gray-400 border-t border-red-800/20 shadow-inner mt-10 p-8 sm:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo and Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-8 mb-8 gap-8">
          
          {/* Logo/Branding */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-3xl font-extrabold text-red-600 tracking-wider hover:text-red-400 transition duration-300">
              CINEHUB
            </Link>
            <p className="mt-2 text-sm max-w-xs">
              Your source for the latest movies, trailers, and reviews. Built with Next.js and Tailwind CSS.
            </p>
          </div>

          {/* Navigation Links Group */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 text-sm w-full md:w-auto">
            
            {/* Column 1: Explore */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 border-l-2 border-red-600 pl-2">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-red-600 transition">Home</Link></li>
                <li><Link href="/popular" className="hover:text-red-600 transition">Popular</Link></li>
                <li><Link href="/new-arrivals" className="hover:text-red-600 transition">New Arrivals</Link></li>
                <li><Link href="/trending" className="hover:text-red-600 transition">Trending</Link></li>
              </ul>
            </div>

            {/* Column 2: Legal/Help */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 border-l-2 border-red-600 pl-2">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-red-600 transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-red-600 transition">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-red-600 transition">Careers</Link></li>
              </ul>
            </div>
            
            {/* Column 3: Legal/Help */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 border-l-2 border-red-600 pl-2">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-red-600 transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-red-600 transition">Terms of Use</Link></li>
              </ul>
            </div>
            
            {/* Column 4: Social Icons (Placeholder) */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 border-l-2 border-red-600 pl-2">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Replace these with actual SVG icons (e.g., from Lucide or Heroicons) */}
                <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-red-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14H8V9h2v7zm4 0h-2V9h2v7z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-red-600 transition duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.3 7.8c-.35 1.48-1.55 2.87-3.08 3.53.95.12 1.76-.23 2.15-.75-.4-.14-.76-.24-1.12-.34.35-.09.67-.18.96-.28-.38-.07-.76-.14-1.14-.24-.26-.85-.75-1.57-1.42-2.13.88.22 1.78.36 2.68.42z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section: Copyright and External Credit */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600">
          <p className="mb-2 sm:mb-0">
            &copy; {new Date().getFullYear()} CINEHUB. All rights reserved.
          </p>
          <p>
            Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-400 transition font-semibold">The Movie Database (TMDB)</a>
          </p>
        </div>
        
      </div>
    </footer>
  );
}