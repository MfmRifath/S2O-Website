import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  pdfFile?: File | null;
}

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Omit<Book, "id">>({
    title: "",
    author: "",
    description: "",
    pdfFile: null,
  });
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/books/all");
      setBooks(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleAddBook = async () => {
    const formData = new FormData();
    formData.append("book", JSON.stringify(newBook));
    if (file) formData.append("file", file);

    try {
      await axios.post("http://localhost:8080/api/books/add/book", formData);
      fetchBooks();
      resetForm();
    } catch (err) {
      setError("Failed to add book");
    }
  };

  const handleEditBook = async (id: number) => {
    const formData = new FormData();
    formData.append("book", JSON.stringify(newBook));
    if (file) formData.append("file", file);

    try {
      await axios.put(`http://localhost:8080/api/books/edit/book/${id}`, formData);
      fetchBooks();
      resetForm();
      setEditBookId(null);
    } catch (err) {
      setError("Failed to edit book");
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/delete/book/${id}`);
      fetchBooks();
    } catch (err) {
      setError("Failed to delete book");
    }
  };

  const handleDownloadBook = async (id: number, title: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books/download/book/${id}/pdf`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError("Failed to download PDF");
    }
  };

  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      description: "",
      pdfFile: null,
    });
    setFile(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📚 Book Manager</h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Add/Edit Form */}
      <div className="bg-gray-100 p-4 rounded-md shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{editBookId ? "Edit Book" : "Add New Book"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={newBook.title}
          onChange={handleInputChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={newBook.author}
          onChange={handleInputChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newBook.description}
          onChange={handleInputChange}
          className="w-full mb-2 p-2 border rounded"
        ></textarea>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mb-4"
          accept="application/pdf"
        />
        <button
          onClick={() => (editBookId ? handleEditBook(editBookId) : handleAddBook())}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editBookId ? "Update Book" : "Add Book"}
        </button>
      </div>

      {/* Book List */}
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      <ul>
        {books.map((book) => (
          <li
            key={book.id}
            className="border rounded p-4 mb-4 shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-700">Author: {book.author}</p>
              <p className="text-gray-600">{book.description}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => {
                  setNewBook(book);
                  setEditBookId(book.id);
                }}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleDownloadBook(book.id, book.title)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Download PDF
              </button>
            </div>
          </li>
        ))}
      </ul>
      {books.length === 0 && <p className="text-gray-500 text-center">No books available</p>}
    </div>
  );
};

export default BookManager;