"use client";

import { useState } from "react";
// Removed Next.js routing dependencies to ensure compilation
// import { useRouter } from "next/router"; 

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Helper function for navigation fallback
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // email & password from state
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.error || "Invalid email or password");
      } else {
        // Save token and user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        // Trigger Navbar update
        window.dispatchEvent(new Event("storage"));
  
        // Redirect to homepage
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // Full screen wrapper with deep dark background
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      
      {/* Login Card - Styled to match the Profile Page */}
      <div className="p-8 w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl shadow-red-900/40 border border-gray-700">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600 tracking-wider">
          CINEHUB Login
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/30 text-red-400 p-3 rounded-lg mb-6 text-center border border-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-3 border border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 placeholder-gray-400"
            required
            disabled={loading}
          />

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="p-3 border border-gray-600 rounded-lg w-full text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 placeholder-gray-400"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-500 transition font-medium text-sm"
              disabled={loading}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`p-3 rounded-lg text-white font-bold text-lg transition duration-300 shadow-lg ${
              loading 
                ? "bg-gray-700 cursor-not-allowed text-gray-400" 
                : "bg-red-600 hover:bg-red-700 shadow-red-500/40"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-t-2 border-white border-t-red-400 rounded-full animate-spin mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login to CINEHUB"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <a 
            href="/auth/register" 
            className="text-red-600 hover:text-red-400 transition font-bold underline-offset-4 hover:underline"
            onClick={(e) => { e.preventDefault(); navigateTo("/auth/register"); }}
          >
            Register Here
          </a>
        </p>
      </div>
    </div>
  );
}