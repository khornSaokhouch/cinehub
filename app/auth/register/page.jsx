"use client";

import { useState } from "react";
// Removed Next.js routing dependencies to ensure compilation

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper function for navigation fallback
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match. Please verify your entries.");
      return;
    }
  
    setLoading(true);
  
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.error || "Failed to register. Please try again.");
      } else {
        setError("Registration successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
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
      
      {/* Register Card - Styled to match the Login/Profile Pages */}
      <div className="p-8 w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl shadow-red-900/40 border border-gray-700">
        
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-red-600 tracking-wider">
          Join CINEHUB
        </h1>

        {/* Error/Success Message */}
        {error && (
          <div className={`p-3 rounded-lg mb-6 text-center border font-medium ${
            error.includes("successful") 
              ? "bg-green-900/30 text-green-400 border-green-600"
              : "bg-red-900/30 text-red-400 border-red-600"
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border border-gray-600 rounded-lg text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 placeholder-gray-400"
            required
            disabled={loading}
          />

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
              placeholder="Password (Min 8 characters)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="p-3 border border-gray-600 rounded-lg w-full text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 placeholder-gray-400"
              required
              minLength={8}
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

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="p-3 border border-gray-600 rounded-lg w-full text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-300 placeholder-gray-400"
              required
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-500 transition font-medium text-sm"
              disabled={loading}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "HIDE" : "SHOW"}
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
                Registering...
              </div>
            ) : (
              "Create CINEHUB Account"
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <a 
            href="/auth/login" 
            className="text-red-600 hover:text-red-400 transition font-bold underline-offset-4 hover:underline"
            onClick={(e) => { e.preventDefault(); navigateTo("/auth/login"); }}
          >
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
}
