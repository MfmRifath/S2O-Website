import React, { useState, useEffect } from "react";

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
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Article added/updated successfully.
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All fields must be filled out.
        </div>
      )}
      <div className="card">
        <div className="card-header">
          {articleId ? "Edit Article" : "Add Article"}
        </div>
        <div className="card-body">
          <form onSubmit={submitArticle}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  required
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Author Qualification</label>
                <input
                  type="text"
                  className="form-control"
                  name="authorQualification"
                  required
                  onChange={(e) => setAuthorQualification(e.target.value)}
                  value={authorQualification}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Published Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  required
                  onChange={handleDateChange}
                  value={date}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Content</label>
                <textarea
                  rows={10}
                  className="form-control"
                  name="content"
                  required
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Upload Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              {articleId ? "Update Article" : "Add Article"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export component
export default AddEditArticle;
