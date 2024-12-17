import React, { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const Bookshelf: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/books/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        📚 Bookshelf
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            {/* Book Cover Image */}
            <img
              src={`http://localhost:8080/api/books/cover/book/${book.id}`}
              alt={`${book.title} Cover`}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            {/* Book Information */}
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 italic mb-2">by {book.author}</p>
            <p className="text-gray-700 mb-4">{book.description}</p>
            <a
              href={`http://localhost:8080/api/books/download/book/${book.id}/pdf`}
              download={`${book.title}.pdf`}
              className="block text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;