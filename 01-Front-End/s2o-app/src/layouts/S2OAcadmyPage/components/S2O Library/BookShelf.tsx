import React, { useEffect, useState } from 'react';
import BookModal from '../../../../Model/BookModal';
import PdfReader from '../../../../utils/PdfReader';


const Bookshelf: React.FC = () => {
  const [books, setBooks] = useState<BookModal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookUrl, setSelectedBookUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/books/all')
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedBookUrl) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <button onClick={() => setSelectedBookUrl(null)}>Back to Bookshelf</button>
        <PdfReader fileUrl={selectedBookUrl} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bookshelf</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {books.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={book.coverImage} alt={`${book.title} cover`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
            <h2 style={{ fontSize: '1.2em', margin: '10px 0' }}>{book.title}</h2>
            <p style={{ fontStyle: 'italic' }}>by {book.author}</p>
            <p>{book.description}</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => setSelectedBookUrl(`http://localhost:8080/api/books/download/book/${book.id}/pdf`)}>Read Online</button>
              <a href={`http://localhost:8080/api/books/download/book/${book.id}/pdf`} download="book.pdf" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;
