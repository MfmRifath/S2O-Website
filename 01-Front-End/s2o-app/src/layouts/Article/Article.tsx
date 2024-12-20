import React, { useEffect, useState } from "react";
import HeadofArticlePage from "./HeadofArticlePage";
import ArticleList from "./ArticleList";


interface Image {
  keyName: string;
  url: string;
}

interface ArticleModal {
  articleId: string;
  title: string;
  author: string;
  authorQualification: string;
  date: string;
  content: string;
  images: Image[]; // Updated to match the API response
}

export const Article: React.FC = () => {
  const [articles, setArticles] = useState<ArticleModal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/articles/all");
        if (!response.ok) {
          throw new Error("Failed to fetch articles. Please try again later.");
        }
        const data: ArticleModal[] = await response.json();

        // Sort articles by date in descending order
        const sortedArticles = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setArticles(sortedArticles);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="bg-gray-100 mt-20 min-h-screen pb-8">
      <HeadofArticlePage />

      {/* Loading State */}
      {loading && (
        <div className="text-center mt-8">
          <div className="text-lg font-semibold text-gray-700">
            Loading articles...
          </div>
          <div className="loader mt-4 mx-auto w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center mt-8">
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && articles.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600 text-lg">No articles available at the moment.</p>
        </div>
      )}

      {/* Articles */}
      <div className="max-w-5xl mx-auto px-4">
        {!loading &&
          !error &&
          articles.map((article) => (
            <ArticleList
              key={article.articleId}
              article={article}
            />
          ))}
      </div>
    </div>
  );
};

export default Article;