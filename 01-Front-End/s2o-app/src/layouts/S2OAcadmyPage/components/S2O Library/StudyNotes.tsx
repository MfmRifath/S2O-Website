import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDownload } from 'react-icons/ai';
import { BiError, BiBookAlt } from 'react-icons/bi';

interface StudyNote {
  id: number;
  title: string;
  description: string;
  author: string;
  publisher: string;
  publicationDate: string;
  subject: string;
  pages: number;
}

const ShowStudyNotes: React.FC = () => {
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<StudyNote[]>([]);
  const [coverUrls, setCoverUrls] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchTerm, notes]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get<StudyNote[]>('http://localhost:8080/api/notes/all');
      setNotes(response.data);
      setFilteredNotes(response.data);
      response.data.forEach(note => fetchNoteCover(note.id));
    } catch (error) {
      console.error('Error fetching notes', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNoteCover = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notes/cover/note/${id}`, {
        responseType: 'blob',
      });
      setCoverUrls(prev => ({ ...prev, [id]: URL.createObjectURL(response.data) }));
    } catch {
      setCoverUrls(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleDownloadPdf = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notes/download/note/${id}/pdf`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `note_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch {
      alert('Error downloading PDF.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-10">
      {/* Header Section */}
      <div className="w-full bg-indigo-700 text-white py-16 px-6 rounded-b-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Discover Your Study Notes
          </h1>
          <p className="text-xl">Explore, read, and download high-quality notes to aid your learning.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl w-full mb-10 px-4 mt-10">
  <input
    type="text"
    placeholder="Search for study notes, subjects, or authors..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full py-3 pl-12 pr-12 text-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-lg rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
  />
  
  
  {/* Clear Button (appears when there's input) */}
  {searchTerm && (
    <button
      onClick={() => setSearchTerm('')}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-all duration-200"
    >
      &times;
    </button>
  )}

  {/* Typing Indicator (changes to spinner on typing) */}
  {searchTerm && (
    <div className="absolute right-16 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center">
      <div className="w-3 h-3 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )}
</div>
      

      {/* Notes Section */}
      <main className="w-full max-w-6xl px-4 sm:px-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 ml-4">Fetching your notes...</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNotes.map(note => (
              <div
                key={note.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {coverUrls[note.id] ? (
                  <div className="relative group">
                    <img
                      src={coverUrls[note.id]}
                      alt="Note Cover"
                      className="w-full h-48 object-cover transition-all duration-500 transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 group-hover:opacity-0 transition-all duration-300"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 text-gray-500">
                    <BiError className="text-4xl" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{note.title}</h3>
                  <p className="text-gray-700 mb-4 text-lg">{note.description}</p>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div className="flex items-center space-x-2">
                      <BiBookAlt className="text-indigo-500" />
                      <p>{note.author}</p>
                    </div>
                    <p>{note.publisher}</p>
                    <p>{note.publicationDate}</p>
                    <p>{note.subject}</p>
                    <p>{note.pages} pages</p>
                  </div>
                  <button
                    onClick={() => handleDownloadPdf(note.id)}
                    className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300"
                  >
                    <AiOutlineDownload className="mr-2 inline-block" /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-8">No notes available.</p>
        )}
      </main>
    </div>
  );
};

export default ShowStudyNotes;