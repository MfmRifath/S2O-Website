// src/components/PerformanceBySubject.tsx
import React, { useEffect, useState } from 'react';
import { SubjectPerformanceDTO } from '../types/MarkDTOs';
import { getPerformanceBySubject } from '../api/markApi';


const PerformanceBySubject: React.FC = () => {
  const [performance, setPerformance] = useState<SubjectPerformanceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPerformanceBySubject();
      setPerformance(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Performance by Subject</h1>
      <table>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Total Marks Obtained</th>
            <th>Total Max Marks</th>
            <th>Average Percentage</th>
          </tr>
        </thead>
        <tbody>
          {performance.map((data) => (
            <tr key={data.subjectId}>
              <td>{data.subjectName}</td>
              <td>{data.totalMarksObtained}</td>
              <td>{data.totalMaxMarks}</td>
              <td>{data.averagePercentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceBySubject;