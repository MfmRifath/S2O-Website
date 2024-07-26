import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import BookModal from '../../../Model/BookModal';
import './BookManager.css';

const BookManager: React.FC = () => {
  const [books, setBooks] = useState<BookModal[]>([]);
  const [editingBook, setEditingBook] = useState<BookModal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/books/all')
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          console.error('Error response:', text);
          throw new Error(`Error ${response.status}: ${text}`);
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCreateOrUpdateBook = (bookData: FormData) => {
    const url = editingBook ? `http://localhost:8080/api/books/edit/book/${editingBook.id}` : 'http://localhost:8080/api/books/add/book';
    const method = editingBook ? 'PUT' : 'POST';

    fetch(url, {
      method,
      body: bookData,
    })
      .then(async response => {
        if (!response.ok) {
          const text = await response.text();
          console.error('Error response:', text);
          throw new Error(`Error ${response.status}: ${text}`);
        }
        return response.json();
      })
      .then(data => {
        setBooks(prevBooks => {
          if (editingBook) {
            return prevBooks.map(book => (book.id === data.id ? data : book));
          } else {
            return [...prevBooks, data];
          }
        });
        setEditingBook(null); // Clear editing state after submission
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
      });
  };

  const handleEditBook = (book: BookModal) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id: number) => {
    fetch(`http://localhost:8080/api/books/delete/book/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            console.error('Error response:', text);
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="book-manager fade-in">
      <h1>Manage Books</h1>
      <BookForm onSubmit={handleCreateOrUpdateBook} initialData={editingBook ?? undefined} />
      <div className="row mt-4">
        {books.map(book => (
          <div key={book.id} className="col-md-4 col-sm-6 mb-4">
            <div className="book-item fade-in">
              <img src={book.coverImage} alt={`${book.title} cover`} className="book-image" />
              <h2 className="book-title">{book.title}</h2>
              <p className="book-description">by {book.author}</p>
              <p>{book.description}</p>
              <div className="book-actions">
                <button className="btn btn-primary" onClick={() => handleEditBook(book)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;
