import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const AddEditArticle: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>(); // Retrieve articleId from the route
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [authorQualification, setAuthorQualification] = useState("");
  const [content, setContent] = useState(""); // Content in Bamini font
  const [date, setDate] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  // Fetch article details if editing
  useEffect(() => {
    if (articleId) {
      const fetchArticleDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/articles/${articleId}`
          );
          const article = response.data;

          // Populate fields with existing article data
          setAuthor(article.author);
          setTitle(article.title);
          setAuthorQualification(article.authorQualification);
          setContent(article.content);
          setDate(article.date);
        } catch (error) {
          console.error("Error fetching article details:", error);
        }
      };

      fetchArticleDetails();
    }
  }, [articleId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit new article (POST)
  const submitArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `http://localhost:8080/api/articles/add/article`;

    if (author && authorQualification && title && content && date) {
      const articleData = {
        author,
        title,
        authorQualification,
        content,
        date,
      };

      const formData = new FormData();
      formData.append("article", JSON.stringify(articleData));
      selectedImages.forEach((file) => formData.append("images", file));

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        });

        if (response.status === 200 || response.status === 201) {
          setDisplaySuccess(true);
          resetFormFields();
        } else {
          throw new Error("Failed to save article.");
        }
      } catch (error) {
        console.error("Error submitting article:", error);
        setDisplaySuccess(false);
        setDisplayWarning(true);
      }
    } else {
      setDisplayWarning(true);
    }
  };

  // Submit edited article (PUT)
  const submitEditArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = `http://localhost:8080/api/articles/edit/article/${articleId}`;

    if (author && authorQualification && title && content && date) {
      const articleData = {
        author,
        title,
        authorQualification,
        content,
        date,
      };

      const formData = new FormData();
      formData.append("article", JSON.stringify(articleData));
      selectedImages.forEach((file) => formData.append("images", file));

      try {
        const response = await axios.put(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        });

        if (response.status === 200 || response.status === 201) {
          setDisplaySuccess(true);
          resetFormFields();
        } else {
          throw new Error("Failed to save article.");
        }
      } catch (error) {
        console.error("Error submitting article:", error);
        setDisplaySuccess(false);
        setDisplayWarning(true);
      }
    } else {
      setDisplayWarning(true);
    }
  };

  const resetFormFields = () => {
    setAuthor("");
    setTitle("");
    setAuthorQualification("");
    setContent("");
    setDate("");
    setSelectedImages([]);
    setUploadProgress(0);
    setDisplayWarning(false);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white rounded-lg shadow-lg">
      {displaySuccess && (
        <div className="mb-4 p-4 text-green-800 bg-green-50 border border-green-300 rounded">
          Article added/updated successfully.
        </div>
      )}
      {displayWarning && (
        <div className="mb-4 p-4 text-red-800 bg-red-50 border border-red-300 rounded">
          All fields must be filled out.
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">
        {articleId ? "Edit Article" : "Add Article"}
      </h1>
      <form onSubmit={articleId ? submitEditArticle : submitArticle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Author
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>
          {/* Author Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Author Qualification
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
              onChange={(e) => setAuthorQualification(e.target.value)}
              value={authorQualification}
            />
          </div>
          {/* Published Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Published Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          {/* Content */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Content (Type in Tamil - Bamini)
            </label>
            <textarea
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none font-bamini"
              required
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          {/* Upload Images */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              multiple
              onChange={handleFileChange}
            />
            <div className="flex flex-wrap mt-4 gap-2">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Upload Progress */}
        {uploadProgress > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">
              Upload Progress
            </label>
            <div className="w-full bg-gray-200 h-4 rounded-lg mt-2">
              <div
                className="bg-green-500 h-4 rounded-lg"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all"
        >
          {articleId ? "Update Article" : "Add Article"}
        </button>
      </form>
    </div>
  );
};

export default AddEditArticle;