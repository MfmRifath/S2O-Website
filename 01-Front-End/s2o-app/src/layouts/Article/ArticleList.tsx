import React, { useState } from "react";
import "./shimmer.css";

interface Image {
  keyName: string;
  url: string;
}

interface Article {
  articleId: string;
  title: string; // Tamil (Bamini encoded)
  author: string; // Tamil (Bamini encoded)
  authorQualification: string; // Tamil (Bamini encoded)
  content: string; // Tamil (Bamini encoded)
  date: string;
  images: Image[];
}

const ArticleList: React.FC<{ article: Article }> = ({ article }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(
    Array(article.images.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="py-10 bg-gradient-to-b from-gray-100 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-200 hover:shadow-xl transition-shadow">
          {/* Article Header */}
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 font-bamini">
              {article.title}
            </h1>
            <div className="mt-4">
              <h3 className="text-lg text-blue-600 font-semibold font-bamini">
                {article.author}
              </h3>
              <p className="text-sm text-gray-500 italic font-bamini">
                {article.authorQualification}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(article.date).toDateString()}
              </p>
            </div>
          </header>

          <hr className="border-t border-gray-300 my-4" />

          {/* Article Content */}
          <section className="text-justify">
            {article.content.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-gray-700 text-base leading-relaxed mb-4 font-serif font-bamini"
              >
                {line}
              </p>
            ))}
          </section>

          {/* Article Images */}
          {article.images && article.images.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {article.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {/* Shimmer Effect */}
                    {!imageLoaded[index] && (
                      <div className="absolute inset-0 bg-gray-300 animate-shimmer rounded-lg"></div>
                    )}
                    {/* Image */}
                    <img
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
                        imageLoaded[index] ? "block" : "hidden"
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageLoad(index)} // Stop shimmer if the image fails to load
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;