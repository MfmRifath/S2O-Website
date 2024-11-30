import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Image {
  url: string;
  keyName: string;
}

interface ArticleModal {
  articleId: number;
  author: string;
  title: string;
  content: string;
  date: string;
  images: Image[];
}

const ArticleTable: React.FC = () => {
  const [articles, setArticles] = useState<ArticleModal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(5);
  const API_URL = "http://localhost:8080/api/articles";

  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ArticleModal[]>(`${API_URL}/all`);
      setArticles(response.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (articleId: number) => {
    navigate(`/edit-article/${articleId}`);
  };

  const [imageLoading, setImageLoading] = useState<boolean[]>([]);

  const handleImageLoad = (index: number) => {
    setImageLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleImageError = (index: number) => {
    setImageLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  const handleDelete = async (articleId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/article/${articleId}`);
      if (response.status === 200) {
        setArticles((prev) => prev.filter((article) => article.articleId !== articleId));
      } else {
        throw new Error("Failed to delete article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
        Article Table
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <p className="text-green-500 font-medium">Loading...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-green-50 border-b border-gray-200">
              <tr>
                {["ID", "Author", "Title", "Content", "Images", "Date", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-green-800 font-semibold"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((article, articleIndex) => (
                <tr
                  key={article.articleId}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-4 py-2">{article.articleId}</td>
                  <td className="px-4 py-2 ">{article.author}</td>
                  <td className="px-4 py-2 ">{article.title}</td>
                  <td className="px-4 py-2 font-bamini">
                    {article.content.substring(0, 100)}...
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2 overflow-x-auto">
                      {article.images && article.images.length > 0 ? (
                        article.images.map((image, index) => (
                          <div
                            key={index}
                            className={`w-12 h-12 rounded shadow ${
                              imageLoading[index]
                                ? "bg-gray-300 animate-pulse"
                                : ""
                            }`}
                          >
                            <img
                              src={image.url}
                              alt={`Article ${article.articleId} - Image ${
                                index + 1
                              }`}
                              className={`w-full h-full object-cover rounded ${
                                imageLoading[index] ? "hidden" : "block"
                              }`}
                              onLoad={() => handleImageLoad(index)}
                              onError={() => handleImageError(index)}
                            />
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-500">No Images</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(article.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(article.articleId)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(article.articleId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 ${
              i + 1 === currentPage
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded transition`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticleTable;