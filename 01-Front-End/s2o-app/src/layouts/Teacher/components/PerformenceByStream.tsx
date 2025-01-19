import React, { useEffect, useState } from 'react';
import { PerformanceDTO } from '../types/MarkDTOs';
import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api/marks';

const PerformanceByStream: React.FC = () => {
  const [performance, setPerformance] = useState<Record<string, PerformanceDTO[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  
  const getPerformanceByStream = async (): Promise<Record<string, PerformanceDTO[]>> => {
    const response = await axios.get(`${BASE_URL}/performance/stream`);
    return response.data;
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getPerformanceByStream();
      setPerformance(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6 animate-fadeIn">
        Performance by Stream
      </h1>
      {Object.keys(performance).map((stream) => (
        <div
          key={stream}
          className="mb-8 bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            {stream}
          </h2>
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
                {performance[stream].map((data, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } transition duration-300`}
                  >
                    <td className="py-2 px-4 border-b">{data.studentName}</td>
                    <td className="py-2 px-4 border-b">{data.subjectName}</td>
                    <td className="py-2 px-4 border-b">{data.examName}</td>
                    <td className="py-2 px-4 border-b">
                      {data.percentage.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceByStream;