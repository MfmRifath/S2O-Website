import React, { useEffect, useState } from "react";
import "./Welcome.css";

export const Welcome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for JWT token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Replace with your storage strategy
    if (token) {
      // Optionally validate the token here
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Large Gradient Circle */}
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-700 rounded-full opacity-30 blur-2xl top-1/4 left-1/4 animate-slow-move"></div>

        {/* Small Floating Circles */}
        <div className="absolute w-64 h-64 bg-indigo-600 opacity-20 rounded-full top-3/4 left-2/3 animate-bounce-slow"></div>
        <div className="absolute w-32 h-32 bg-blue-500 opacity-25 rounded-full bottom-1/4 right-1/3 animate-float"></div>

        {/* Diagonal Glow Line */}
        <div className="absolute w-96 h-1 bg-gradient-to-r from-indigo-300 via-blue-400 to-blue-500 top-1/3 left-1/3 rotate-45 opacity-50 blur-md"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center animate-fade-in-content">
        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest leading-tight opacity-100 animate-heading">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-blue-300 to-indigo-400 animate-gradient">
            Science Society of Oluvil
          </span>
          <span className="block text-lg md:text-2xl font-light mt-3 text-indigo-200 animate-fade-in-subtitle">
            Take our Society to the next level is our aim
          </span>
        </h1>

        {/* Styled Button */}
        <a
          href={isLoggedIn ? "/s2oacademy" : "/login"} // Link changes based on login status
          className="mt-10 inline-block bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-700 text-white text-lg md:text-xl font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 relative focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          {isLoggedIn ? "Explore S2O Academy" : "Sign In"} {/* Conditional Text */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 opacity-20 blur-lg"></span>
        </a>
      </div>
    </header>
  );
};