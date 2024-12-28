import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';

interface ExamPaper {
  id: number;
  title: string;
  year: string;
  coverImageUrl?: string;
}

interface ExamPaperListProps {
  examPapers: ExamPaper[];
  onEdit?: (examPaper: ExamPaper) => void;
  onDelete?: (id: number) => void;
  onDownload?: (id: number, title: string) => void;
}

const ExamPaperList: React.FC<ExamPaperListProps> = ({ examPapers, onEdit, onDelete, onDownload }) => {
  const [examPapersWithImages, setExamPapersWithImages] = useState<ExamPaper[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredExamPapers, setFilteredExamPapers] = useState<ExamPaper[]>(examPapers);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate API for cover images
  useEffect(() => {
    const fetchCoverImages = async () => {
      const updatedExamPapers = await Promise.all(
        examPapers.map((examPaper) => ({
          ...examPaper,
          coverImageUrl: `http://localhost:8080/api/examPaper/cover/examPaper/${examPaper.id}`,
        }))
      );
      setExamPapersWithImages(updatedExamPapers);
      setIsLoading(false);
    };
    fetchCoverImages();
  }, [examPapers]);

  // Filter exam papers based on search or selected year
  useEffect(() => {
    let filtered = examPapersWithImages;
    if (searchQuery) {
      filtered = filtered.filter(
        (examPaper) =>
          examPaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          examPaper.year.includes(searchQuery)
      );
    }
    if (selectedYear) {
      filtered = filtered.filter((examPaper) => examPaper.year === selectedYear);
    }
    setFilteredExamPapers(filtered);
  }, [searchQuery, selectedYear, examPapersWithImages]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white">Welcome to the S2O Exam Paper Store</h1>
          <p className="text-lg text-gray-200 mt-2">Find and download exam papers with ease</p>
          <div className="relative mt-6">
            <div className="flex items-center">
              <FaSearch className="text-gray-500 absolute left-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or year..."
                className="w-full bg-white text-gray-700 rounded-full px-12 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-gray-500"
                >
                  X
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-4xl mx-auto mt-6 px-4 flex justify-between items-center">
        <div className="space-x-4">
          {[...new Set(examPapers.map((paper) => paper.year)), 'All'].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year === 'All' ? null : year)}
              className={`px-4 py-2 rounded-full font-medium ${
                selectedYear === year
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Papers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-6">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading exam papers...</div>
        ) : (
          filteredExamPapers.map((examPaper) => (
            <div
              key={examPaper.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-gray-200">
                {examPaper.coverImageUrl ? (
                  <img
                    src={examPaper.coverImageUrl}
                    alt={`${examPaper.title} Cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <span>No Image Available</span>
                  </div>
                )}
              </div>

              {/* Title and Actions */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{examPaper.title}</h3>
                <p className="text-sm text-gray-600">Year: {examPaper.year}</p>

                <div className="mt-4 flex space-x-3">
                  {onDownload && (
                    <button
                      onClick={() => onDownload(examPaper.id, examPaper.title)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
                    >
                      <FaDownload />
                      <span>Download</span>
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(examPaper)}
                      className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center space-x-2"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(examPaper.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-2"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExamPaperList;