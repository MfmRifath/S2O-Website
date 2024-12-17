import React from "react";
const LibraryHeader: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16 mb-8 mt-8 shadow-lg rounded-lg">
      {/* Centered Content */}
      <div className="flex flex-col items-center text-center px-6 sm:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">S2O LIBRARY</span>
        </h1>
        <p className="text-lg sm:text-xl font-light max-w-2xl leading-relaxed">
          Access knowledge anytime, anywhere with our Online Library.
        </p>
      </div>
    </div>
  );
};

export default LibraryHeader;