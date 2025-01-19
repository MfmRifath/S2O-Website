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
    <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
          {/* Article Header */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <div className="mt-2">
              <h3 className="text-xl text-indigo-600 font-medium">
                {article.author}
              </h3>
              <p className="text-sm text-gray-600 italic">
                {article.authorQualification}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(article.date).toDateString()}
              </p>
            </div>
          </header>

          <hr className="border-t border-gray-300 mb-8" />

          {/* Article Content */}
          <section className="text-justify max-w-prose mx-auto">
            {article.content.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-gray-700 text-lg leading-relaxed mb-6 font-bamini"
              >
                {line}
              </p>
            ))}
          </section>

          {/* Article Images */}
          {article.images && article.images.length > 0 && (
            <section className="mt-12">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {article.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300"
                  >
                    {/* Shimmer Effect */}
                    {!imageLoaded[index] && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-xl"></div>
                    )}
                    {/* Image */}
                    <img
                      src={image.url}
                      alt={`Gallery image ${index + 1}`}
                      className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110 ${
                        imageLoaded[index] ? "block" : "hidden"
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageLoad(index)} // Stop shimmer if the image fails to load
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        View Image
                      </span>
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