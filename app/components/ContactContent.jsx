"use client";
import React, { useState } from "react";
import { Mail, MapPin, Send, Twitter, Instagram, Loader2 } from "lucide-react";

const InputField = ({ label, name, type = "text", required = false, formData, handleChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      required={required}
      value={formData[name]}
      onChange={handleChange}
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
    />
  </div>
);

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    setTimeout(() => {
      console.log("Form Submitted:", formData);
      setIsSubmitting(false);
      setSubmitMessage("Thank you for your message! We will get back to you shortly.");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold mb-6 text-white">Send Us A Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Full Name" name="name" required formData={formData} handleChange={handleChange} />
          <InputField label="Email Address" name="email" type="email" required formData={formData} handleChange={handleChange} />

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
            ></textarea>
          </div>

          {submitMessage && (
            <p
              className={`py-3 px-4 rounded-lg font-medium leading-relaxed tracking-wide ${
                submitMessage.includes("Thank you")
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {submitMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold transition duration-300 shadow-lg shadow-indigo-500/50 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Inquiry</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="lg:col-span-1 bg-gray-700/50 p-6 rounded-xl border border-gray-600 h-fit">
        <h2 className="text-2xl font-bold text-white mb-4">Contact Details</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-indigo-400 mt-1" />
            <div>
              <p className="font-semibold text-gray-200 mb-1">Email Us</p>
              <a href="mailto:support@movieapp.com" className="text-indigo-400 hover:text-indigo-300 transition">
                support@movieapp.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-indigo-400 mt-1" />
            <div>
              <p className="font-semibold text-gray-200 mb-1">Our Location</p>
              <p className="text-gray-400 leading-relaxed">
                123 Cinema Lane,<br /> Hollywood, CA 90028
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-200 mb-2">Connect with Us</p>
            <div className="flex space-x-4">
              <Twitter className="w-7 h-7 text-indigo-400 hover:text-indigo-300 transition cursor-pointer" />
              <Instagram className="w-7 h-7 text-indigo-400 hover:text-indigo-300 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

