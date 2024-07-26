import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import BookModal from '../../../Model/BookModal';


const BookManager: React.FC = () => {
  const [books, setBooks] = useState<BookModal[]>([]);
  const [editingBook, setEditingBook] = useState<BookModal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCreateOrUpdateBook = (bookData: FormData) => {
    const url = editingBook ? `/api/books/${editingBook.id}` : '/api/books';
    const method = editingBook ? 'PUT' : 'POST';
    
    fetch(url, {
      method,
      body: bookData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
        setEditingBook(null);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleEditBook = (book: BookModal) => {
    setEditingBook(book);
  };

  const handleDeleteBook = (id: number) => {
    fetch(`/api/books/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
      })
      .catch(error => {
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Manage Books</h1>
      <BookForm onSubmit={handleCreateOrUpdateBook} initialData={editingBook ?? undefined} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {books.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={book.coverImage} alt={`${book.title} cover`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <h2 style={{ fontSize: '1.2em', margin: '10px 0' }}>{book.title}</h2>
            <p style={{ fontStyle: 'italic' }}>by {book.author}</p>
            <p>{book.description}</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleEditBook(book)}>Edit</button>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookManager;
