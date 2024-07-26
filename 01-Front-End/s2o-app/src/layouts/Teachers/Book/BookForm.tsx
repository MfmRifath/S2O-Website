import React, { useState, ChangeEvent, FormEvent } from 'react';
import BookModal from '../../../Model/BookModal';

interface BookFormProps {
  onSubmit: (book: FormData) => void;
  initialData?: BookModal;
}



const BookForm: React.FC<BookFormProps> = ({ onSubmit, initialData }) => {
  const [book, setBook] = useState<BookModal>(
    initialData || {
        id:0,
      title: '',
      author: '',
      coverImage: '',
      description: '',
      publisher: '',
      publicationDate: '',

      genre: '',
      pages: 0,
      readOnlineLink: ''
    }
  );

  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={book.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Author</label>
        <input type="text" name="author" value={book.author} onChange={handleChange} required />
      </div>
      <div>
        <label>Cover Image</label>
        <input type="text" name="coverImage" value={book.coverImage} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={book.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Publisher</label>
        <input type="text" name="publisher" value={book.publisher} onChange={handleChange} required />
      </div>
      <div>
        <label>Publication Date</label>
        <input type="date" name="publicationDate" value={book.publicationDate} onChange={handleChange} required />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" name="genre" value={book.genre} onChange={handleChange} required />
      </div>
      <div>
        <label>Pages</label>
        <input type="number" name="pages" value={book.pages} onChange={handleChange} required />
      </div>
      <div>
        <label>Read Online Link</label>
        <input type="url" name="readOnlineLink" value={book.readOnlineLink} onChange={handleChange} required />
      </div>
      <div>
        <label>PDF File</label>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;
