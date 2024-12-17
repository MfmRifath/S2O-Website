import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { SubjectPerformanceDTO } from '../types/MarkDTOs';
import { getPerformanceBySubject } from '../api/markApi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

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

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;

  // Data for charts
  const subjects = performance.map((data) => data.subjectName);
  const totalMarks = performance.map((data) => data.totalMarksObtained);
  const maxMarks = performance.map((data) => data.totalMaxMarks);
  const averagePercentage = performance.map((data) => data.averagePercentage);

  const barData = {
    labels: subjects,
    datasets: [
      {
        label: 'Total Marks Obtained',
        data: totalMarks,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Max Marks',
        data: maxMarks,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: subjects,
    datasets: [
      {
        label: 'Average Percentage',
        data: averagePercentage,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance by Subject - Marks Overview',
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance by Subject - Average Percentage',
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Performance by Subject</h1>

      {/* Bar Chart */}
      <div className="mb-10">
        <Bar data={barData} options={barOptions} />
      </div>

      {/* Line Chart */}
      <div>
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
};

export default PerformanceBySubject;