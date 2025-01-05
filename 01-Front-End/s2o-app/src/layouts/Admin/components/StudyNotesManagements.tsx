import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';

interface StudyNote {
  id: number;
  title: string;
  author: string;
  description: string;
  publisher: string;
  publicationDate: string;
  subject: string;
  pages: number;
}

const StudyNotesManagement: React.FC = () => {
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    publisher: '',
    publicationDate: new Date(), // Use Date object
    subject: '',
    pages: 0,
  });
  const [file, setFile] = useState<File | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get<StudyNote[]>('http://localhost:8080/api/notes/all');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({ ...formData, publicationDate: date });
    }
  };

  const handleAddOrUpdateNote = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const noteData = {
      ...formData,
      publicationDate: formData.publicationDate.toISOString().split('T')[0], // Format date
    };
    const formDataToSend = new FormData();
    formDataToSend.append('notes', JSON.stringify(noteData));
    formDataToSend.append('file', file);

    try {
      if (selectedNoteId) {
        await axios.put(`http://localhost:8080/api/notes/edit/note/${selectedNoteId}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Note updated successfully');
      } else {
        await axios.post('http://localhost:8080/api/notes/add/note', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Note added successfully');
      }
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error('Error saving note', error);
    }
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/delete/note/${id}`);
      alert('Note deleted successfully');
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  const handleDownloadPdf = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notes/download/note/${id}/pdf`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `note_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading note', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      publisher: '',
      publicationDate: new Date(),
      subject: '',
      pages: 0,
    });
    setFile(null);
    setSelectedNoteId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Study Notes</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add or Edit Note</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <DatePicker
            selected={formData.publicationDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="p-2 border rounded-md w-full"
            placeholderText="Publication Date"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <input
            type="number"
            name="pages"
            placeholder="Pages"
            value={formData.pages}
            onChange={handleInputChange}
            className="p-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="p-2 border rounded-md col-span-2"
          />
          <input type="file" onChange={handleFileChange} className="p-2 border rounded-md col-span-2" />
        </div>
        <button
          onClick={handleAddOrUpdateNote}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
        >
          {selectedNoteId ? 'Update Note' : 'Add Note'}
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Notes List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">{note.title}</h3>
            <p className="text-gray-700">{note.description}</p>
            <p className="text-sm text-gray-500">Author: {note.author}</p>
            <p className="text-sm text-gray-500">Published on: {note.publicationDate}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleDownloadPdf(note.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
              >
                Download PDF
              </button>
              <button
                onClick={() => {
                  setFormData({
                    ...note,
                    publicationDate: new Date(note.publicationDate),
                  });
                  setSelectedNoteId(note.id);
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyNotesManagement;