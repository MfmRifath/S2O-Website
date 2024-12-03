// src/components/PerformanceByStream.tsx
import React, { useEffect, useState } from 'react';
import { PerformanceDTO } from '../types/MarkDTOs';
import { getPerformanceByStream } from '../api/markApi';


const PerformanceByStream: React.FC = () => {
  const [performance, setPerformance] = useState<Record<string, PerformanceDTO[]>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPerformanceByStream();
      setPerformance(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Performance by Stream</h1>
      {Object.keys(performance).map((stream) => (
        <div key={stream}>
          <h2>{stream}</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {performance[stream].map((data, index) => (
                <tr key={index}>
                  <td>{data.studentName}</td>
                  <td>{data.subjectName}</td>
                  <td>{data.examName}</td>
                  <td>{data.percentage.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PerformanceByStream;