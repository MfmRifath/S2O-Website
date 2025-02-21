import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PerformanceDTO } from '../types/MarkDTOs';

const BASE_URL = 'http://localhost:8080/api/marks';

const PerformanceByStream: React.FC = () => {
  const [performance, setPerformance] = useState<Record<string, PerformanceDTO[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // For filtering
  const [expandedStream, setExpandedStream] = useState<string | null>(null);

  // Fetch performance data (grouped by stream) from backend
  const getPerformanceByStream = async (): Promise<Record<string, PerformanceDTO[]>> => {
    const response = await axios.get(`${BASE_URL}/performance/stream`);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPerformanceByStream();
        setPerformance(data);
      } catch (err) {
        console.error('Failed to fetch performance data:', err);
        setError('Failed to fetch performance data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic: if searchTerm is provided, filter each stream's data by student name or subject name.
  const filterPerformanceData = (items: PerformanceDTO[]) => {
    if (!searchTerm) return items;
    return items.filter(
      (item) =>
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Toggle expanded stream
  const handleToggleStream = (stream: string) => {
    setExpandedStream((prev) => (prev === stream ? null : stream));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Performance by Stream, Year & Exam
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Student or Subject..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none"
        />
      </div>

      {Object.keys(performance).length === 0 && (
        <p className="text-center text-gray-600">No performance data available.</p>
      )}

      {/* Streams Accordion */}
      {Object.keys(performance).map((stream) => {
        // Filter data for this stream
        const streamData = filterPerformanceData(performance[stream]);

        // Group by student's year using the top-level property.
        const groupedByYear = streamData.reduce((acc, curr) => {
          const year = curr.year || 'Unknown Year';
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(curr);
          return acc;
        }, {} as Record<string, PerformanceDTO[]>);

        return (
          <div
            key={stream}
            className="mb-4 bg-white shadow rounded-lg border border-gray-200 transition-shadow duration-300"
          >
            {/* Stream Accordion Header */}
            <button
              onClick={() => handleToggleStream(stream)}
              className="w-full text-left px-6 py-4 bg-gray-100 hover:bg-gray-200 font-semibold text-lg text-gray-800 flex justify-between items-center focus:outline-none"
            >
              <span>{stream}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  expandedStream === stream ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>

            {/* Stream Accordion Content */}
            {expandedStream === stream && (
              <div className="p-6">
                {Object.entries(groupedByYear).map(([year, yearData]) => {
                  // Within each year, group by exam (using examName)
                  const groupedByExam = yearData.reduce((acc, curr) => {
                    const exam = curr.examName || 'Unknown Exam';
                    if (!acc[exam]) {
                      acc[exam] = [];
                    }
                    acc[exam].push(curr);
                    return acc;
                  }, {} as Record<string, PerformanceDTO[]>);

                  return (
                    <div key={year} className="mb-6">
                      <h2 className="text-xl font-semibold mb-4">{year}</h2>
                      {Object.entries(groupedByExam).map(([exam, examData]) => (
                        <div key={exam} className="mb-4">
                          <h3 className="text-lg font-semibold mb-3">{exam}</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-blue-100 text-blue-800">
                                  <th className="py-2 px-4 border-b">Student Name</th>
                                  <th className="py-2 px-4 border-b">Subject</th>
                                  <th className="py-2 px-4 border-b">Exam</th>
                                  <th className="py-2 px-4 border-b">Percentage</th>
                                </tr>
                              </thead>
                              <tbody>
                                {examData.map((item, index) => (
                                  <tr
                                    key={index}
                                    className={`hover:bg-blue-50 ${
                                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } transition duration-300`}
                                  >
                                    <td className="py-2 px-4 border-b">{item.studentName}</td>
                                    <td className="py-2 px-4 border-b">{item.subjectName}</td>
                                    <td className="py-2 px-4 border-b">{item.examName}</td>
                                    <td className="py-2 px-4 border-b">{item.percentage.toFixed(2)}%</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PerformanceByStream;