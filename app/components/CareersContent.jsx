"use client";
import React from "react";
import { Briefcase, ChevronRight } from "lucide-react";

export default function CareersContent() {
  const jobs = [
    { title: "Senior Frontend Engineer (React/Next.js)", location: "Remote/LA", type: "Full-time" },
    { title: "Content Acquisition Manager", location: "Los Angeles, CA", type: "Full-time" },
    { title: "UI/UX Designer", location: "Remote", type: "Contract" },
  ];

  const JobListing = ({ title, location, type }) => (
    <a href="#" className="block p-5 bg-gray-700/50 hover:bg-gray-700 rounded-xl border border-gray-600 hover:border-indigo-500/50 transition">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
          <p className="text-indigo-400 font-medium text-sm">
            {location} &bull; {type}
          </p>
        </div>
        <ChevronRight className="w-6 h-6 text-gray-400 mt-1" />
      </div>
    </a>
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-white flex items-center space-x-3">
        <Briefcase className="w-8 h-8 text-indigo-400" /> <span>Join Our Team</span>
      </h2>

      <p className="text-gray-400 text-lg mb-10 border-b border-gray-700 pb-6">
        We’re building the next generation of movie discovery. If you’re passionate about film, tech, and UX, we’d love to meet you.
      </p>

      <h3 className="text-2xl font-bold text-white mb-4">Open Positions</h3>
      <div className="space-y-4">{jobs.map((job, i) => <JobListing key={i} {...job} />)}</div>

      <p className="mt-8 text-gray-400 text-center">
        Don’t see a role for you? Send your resume to{" "}
        <a href="mailto:careers@movieapp.com" className="text-indigo-400 hover:underline">
          careers@movieapp.com
        </a>
        .
      </p>
    </div>
  );
}
