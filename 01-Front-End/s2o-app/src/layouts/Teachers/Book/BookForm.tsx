import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import BookModal from '../../../Model/BookModal';
import './BookForm.css';

interface BookFormProps {
  onSubmit: (book: FormData) => void;
  initialData?: BookModal | null;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const [book, setBook] = useState<BookModal>(
    initialData || {
      id: 0,
      title: '',
      author: '',
      coverImage: '',
      description: '',
      publisher: '',
      publicationDate: '',
      genre: '',
      pages: 0
    }
  );

  const [file, setFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleCoverImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setCoverImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBook({ ...book, coverImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('book', JSON.stringify(book));
    if (file) {
      formData.append('file', file);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title" name="title" value={book.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input type="text" className="form-control" id="author" name="author" value={book.author} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="coverImage">Cover Image</label>
        <input type="file" className="form-control-file" id="coverImage" accept="image/*" onChange={handleCoverImageChange} required />
        {book.coverImage && <img src={book.coverImage} alt="Cover" className="img-thumbnail mt-2" style={{ width: '100px', height: 'auto' }} />}
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" id="description" name="description" value={book.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="publisher">Publisher</label>
        <input type="text" className="form-control" id="publisher" name="publisher" value={book.publisher} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="publicationDate">Publication Date</label>
        <input type="date" className="form-control" id="publicationDate" name="publicationDate" value={book.publicationDate} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre</label>
        <input type="text" className="form-control" id="genre" name="genre" value={book.genre} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="pages">Pages</label>
        <input type="number" className="form-control" id="pages" name="pages" value={book.pages} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="pdfFile">PDF File</label>
        <input type="file" className="form-control-file" id="pdfFile" accept="application/pdf" onChange={handleFileChange} />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default BookForm;
