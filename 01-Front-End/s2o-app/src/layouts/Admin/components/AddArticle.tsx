import React, { useState } from "react";

export const AddEditArticle: React.FC = () => {
  const [articleId, setArticleId] = useState<number | null>(null);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [authorQualification, setAuthorQualification] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImages(files);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const submitArticle = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = articleId
      ? `http://localhost:8080/api/articles/edit/article/${articleId}`
      : `http://localhost:8080/api/articles/add/article`;

    if (
      author &&
      authorQualification &&
      title &&
      content &&
      date &&
      selectedImages.length > 0
    ) {
      const articleData = {
        author,
        title,
        authorQualification,
        content,
        date,
      };

      const formData = new FormData();
      formData.append("article", JSON.stringify(articleData)); // Send article data as JSON
      selectedImages.forEach((file) => formData.append("images", file));

      const requestOptions: RequestInit = {
        method: articleId ? "PUT" : "POST",
        body: formData,
      };

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          throw new Error("Failed to add/update article");
        }
        resetFormFields();
        setDisplaySuccess(true);
        setDisplayWarning(false);
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
    setArticleId(null);
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
      <form onSubmit={submitArticle}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Author
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              name="author"
              required
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Author Qualification
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              name="authorQualification"
              required
              onChange={(e) => setAuthorQualification(e.target.value)}
              value={authorQualification}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Published Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              name="date"
              required
              onChange={handleDateChange}
              value={date}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Content
            </label>
            <textarea
              rows={8}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              name="content"
              required
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 focus:ring-2 focus:ring-green-400 transition-all"
        >
          {articleId ? "Update Article" : "Add Article"}
        </button>
      </form>
    </div>
  );
};

// Export component
export default AddEditArticle;