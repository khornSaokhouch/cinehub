"use client";

import { MessageSquare, Github, Linkedin, Mail, Film, RotateCcw, Palette } from 'lucide-react'; // Using lucide-react icons

// Fallback component for icons if lucide-react is not available
const Icon = ({ children, className }) => (
    <div className={`inline-block ${className}`}>{children}</div>
);

// Main component for the "About CINEHUB" page
export default function AboutPage() {
    // --- CINEHUB Platform Data ---
    const name = "CINEHUB";
    const title = "Your Home for Cinematic Discovery";
    const bio = `
        CINEHUB is a modern, responsive platform built for movie enthusiasts. Our mission is to provide a seamless and visually stunning experience for discovering new films, exploring popular releases, and tracking upcoming blockbusters. We prioritize clean UI/UX and real-time data to ensure you always have the latest, most accurate movie information at your fingertips.
        
        The platform is built using the latest web technologies, including React and Tailwind CSS, and all movie data is sourced reliably and updated daily.
    `;

    const platformStats = [
        { 
            label: "Movies Available", 
            value: "700K+", 
            icon: (
                <Film className="w-8 h-8" />
            )
        },
        { 
            label: "Data Updated", 
            value: "Daily", 
            icon: (
                <RotateCcw className="w-8 h-8" />
            )
        },
        { 
            label: "Tech Focus", 
            value: "React / TMDB", 
            icon: (
                <Palette className="w-8 h-8" />
            )
        },
    ];

    // --- Creator Profile Data (Khorn Saokhouch) ---
    const creatorName = "Khorn Saokhouch";
    const creatorTitle = "Software Developer & UI Specialist";
    const creatorBio = `
        Hello! I'm Khorn Saokhouch, the lead developer behind CINEHUB. This project is a passion blend of modern web development and a lifelong love for cinema. My goal was to create a dark-themed, responsive user interface that feels as polished and engaging as a high-budget movie production. I focus on clean code, modular architecture, and delivering an exceptional user experience across all devices.
    `;
    
    const creatorStats = [
        { label: "Role", value: "Developer", icon: 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> // Code Icon
        },
        { label: "Expertise", value: "React / Tailwind", icon: 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> // Clock Icon
        },
        { label: "Location", value: "Global", icon: 
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-2.01.69-3.87 1.85-5.32l11.47 11.47C15.87 19.31 14.01 20 12 20c-4.41 0-8-3.59-8-8z"/></svg> // Globe Icon
        },
    ];


    return (
        // Deep cinematic background
        <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10">
            <div className="max-w-4xl mx-auto py-10">

                {/* ======================================= */}
                {/* 1. CINEHUB PLATFORM SECTION */}
                {/* ======================================= */}
                <header className="text-center mb-12">
                    {/* Logo Initial: CINEHUB (CH) */}
                    <div className="w-32 h-32 mx-auto rounded-full bg-red-600 flex items-center justify-center border-4 border-red-400 shadow-2xl shadow-red-500/30 mb-4">
                        <span className="text-6xl font-extrabold">CH</span>
                    </div>
                    
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                        {name}
                    </h1>
                    <p className="text-xl text-red-600 font-semibold mt-2">
                        {title}
                    </p>
                    
                    {/* Key Resources Links */}
                    <div className="flex justify-center gap-6 mt-6 text-gray-400">
                        <a href="mailto:support@cinehub.com" className="hover:text-red-500 transition duration-300 flex items-center gap-2">
                            <Mail className="w-5 h-5"/>
                            Support Email
                        </a>
                        <a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition duration-300 flex items-center gap-2">
                            {/* SVG fallback for documentation icon (briefcase) */}
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M12 2v4"/><path d="M12 18v4"/></svg>
                            TMDB API Info
                        </a>
                        <a href="/feedback" className="hover:text-red-500 transition duration-300 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5"/>
                            Send Feedback
                        </a>
                    </div>
                </header>

                {/* About Bio Card */}
                <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 mb-12">
                    <h2 className="text-3xl font-bold text-red-500 mb-4 border-b border-red-800/50 pb-2">
                        Our Mission
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                        {bio}
                    </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {platformStats.map((stat, index) => (
                        <div key={`platform-${index}`} className="bg-gray-800 p-6 rounded-xl border-l-4 border-red-600 shadow-lg flex flex-col items-center text-center transition duration-300 hover:bg-gray-700/50">
                            <Icon className="text-red-500 mb-3 w-8 h-8">
                                {stat.icon}
                            </Icon>
                            <p className="text-4xl font-extrabold text-red-600 tracking-tighter">{stat.value}</p>
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* API Credit Section */}
                <div className="mt-12 text-center border-b border-gray-700 pb-12">
                    <p className="text-xl text-gray-300 mb-4">
                        CINEHUB is powered by rich, accurate data from:
                    </p>
                    <a 
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-red-600 text-white text-lg font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 shadow-xl shadow-red-500/40 transform hover:scale-[1.02]"
                    >
                        <MessageSquare className="w-5 h-5 mr-2"/>
                        The Movie Database (TMDB)
                    </a>
                </div>

                {/* ======================================= */}
                {/* 2. CREATOR PROFILE SECTION (Updated UI) */}
                {/* ======================================= */}
                <section className="mt-16 pt-8 text-center">
                    {/* Large Initial from original design */}
                    <div className="w-32 h-32 mx-auto rounded-full bg-red-600 flex items-center justify-center border-4 border-red-400 shadow-2xl shadow-red-500/30 mb-4">
                        <span className="text-6xl font-extrabold">{creatorName.charAt(0)}</span>
                    </div>

                    <h2 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                        {creatorName}
                    </h2>
                    <p className="text-xl text-red-600 font-semibold mt-2 border-b border-red-800/50 inline-block pb-1">
                        {creatorTitle}
                    </p>
                    
                    {/* Creator Bio Card */}
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-red-700/50 mt-10 mb-12 text-left">
                        <h3 className="text-2xl font-bold text-red-500 mb-4">
                            Developer Insight
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                            {creatorBio}
                        </p>
                    </div>

                    {/* Creator Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {creatorStats.map((stat, index) => (
                            <div key={`creator-${index}`} className="bg-gray-800 p-6 rounded-xl border-l-4 border-red-600 shadow-lg flex flex-col items-center text-center transition duration-300 hover:bg-gray-700/50">
                                <Icon className="text-red-500 mb-3 w-8 h-8">
                                    {stat.icon}
                                </Icon>
                                <p className="text-4xl font-extrabold text-red-600 tracking-tighter">{stat.value}</p>
                                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                     {/* Contact Section */}
                    <div className="mt-12 text-center">
                        <p className="text-xl text-gray-300 mb-4">
                            Connect with Khorn Saokhouch:
                        </p>
                        <div className="flex justify-center gap-6 mt-6 text-gray-400">
                             <a href="mailto:khorn.saokhouch@example.com" className="hover:text-red-500 transition duration-300 flex items-center gap-2">
                                <Mail className="w-5 h-5"/>
                                Email
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition duration-300 flex items-center gap-2">
                                <Github className="w-5 h-5"/>
                                GitHub
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition duration-300 flex items-center gap-2">
                                <Linkedin className="w-5 h-5"/>
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}
