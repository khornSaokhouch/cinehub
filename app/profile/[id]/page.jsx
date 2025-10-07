"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function for navigation fallback
  const navigateTo = (path) => {
    window.location.href = path;
  };

  // --- Profile Data Fetch (MOCK) ---
  useEffect(() => {
    const fetchProfile = async () => {
      const loggedInUserString = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!token || !loggedInUserString) {
        setError("You must be logged in to view this profile.");
        setLoading(false);
        // Navigate away after setting error
        setTimeout(() => navigateTo("/login"), 2000); 
        return;
      }
      
      // Simulate API call delay and success
      await new Promise(resolve => setTimeout(resolve, 500)); 
      
      try {
        const loggedInUser = JSON.parse(loggedInUserString);
        
        // Mock data structure, using stored user info
        const mockProfileData = {
          id: loggedInUser.id,
          name: loggedInUser.name || "CineHub Member",
          email: loggedInUser.email || "user@cinehub.com",
          joinDate: "October 2023", // Example added detail
        };
        
        setUser(mockProfileData);

      } catch (err) {
        setError("Error loading profile data. Please try logging in again.");
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --- Logout Handler ---
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Trigger the Navbar to update its state (show 'Sign In' button)
    window.dispatchEvent(new Event("storage"));
    
    // Redirect user to the login page using compatible method
    navigateTo("/auth/login");
  };

  // --- Render States ---
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-[400px] text-red-500">
            <div className="w-8 h-8 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin mr-3"></div>
            <p className="text-lg text-gray-400">Loading cinematic profile...</p>
        </div>
    );
  }
  
  if (error) {
    return (
        <div className="p-8 max-w-md mx-auto mt-10 text-center bg-gray-800 rounded-xl shadow-lg border-l-4 border-red-600">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
            <p className="text-gray-300">{error}</p>
            <button
                onClick={() => navigateTo("/auth/login")}
                className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300"
            >
                Go to Login
            </button>
        </div>
    );
  }

  // --- Main Profile View ---
  return (
    <div className="p-4 sm:p-8 min-h-screen bg-gray-900 text-white">
      <div className="max-w-xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-4xl font-extrabold text-red-600 tracking-wider">
                My CINEHUB Profile
            </h1>
            <p className="text-gray-400 mt-1">Manage your account information and preferences.</p>
        </div>

        {/* Profile Card */}
        {user && (
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
            
            {/* Avatar Placeholder (Large Initials) */}
            <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center border-4 border-red-400 shadow-2xl shadow-red-500/30">
                    <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
                </div>
                <h2 className="text-2xl font-semibold mt-4 text-white">{user.name}</h2>
                <p className="text-sm text-gray-400 mt-1">Member since {user.joinDate}</p>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 pt-4 border-t border-gray-700">
                
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-300">User ID:</span> 
                    <span className="text-sm text-gray-400">{user.id}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-300">Email:</span> 
                    <span className="text-white font-medium">{user.email}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <span className="font-semibold text-gray-300">Subscription:</span> 
                    <span className="text-green-400 font-bold">Premium Tier</span>
                </div>

            </div>
            
            {/* Logout Button */}
            <div className="mt-8 pt-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white text-lg font-bold py-3 rounded-xl hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/40"
                >
                    Log Out of CINEHUB
                </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
