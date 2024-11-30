import React from "react";

const HeadofArticlePage: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-green-400 text-white py-20 mb-10">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <div className="text-box">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-yellow-300">S2O Articles</span>
          </h1>
          <p className="text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
            Dive into groundbreaking studies and insights with{" "}
            <span className="font-semibold text-yellow-200">
              Science of Oluvil.
            </span>{" "}
            Explore expert-driven articles, analyses, and innovative research.
          </p>
        </div>
      </div>
      {/* Optional Decorative Elements */}
      <div className="absolute inset-x-0 bottom-0">
        <svg
          className="w-full h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,234.7C672,224,768,160,864,133.3C960,107,1056,117,1152,144C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeadofArticlePage;