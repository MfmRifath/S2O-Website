import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MarksDistribution {
  subject: string;
  exam: string;
  year: string;
  distribution: number[];
}

const MarksDistribution: React.FC = () => {
  const [data, setData] = useState<MarksDistribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  const BASE_URL = 'http://localhost:8080/api/marks';

  const fetchMarksDistribution = async () => {
    const response = await axios.get(`${BASE_URL}/distribution`);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const distributionData = await fetchMarksDistribution();
        setData(distributionData);
      } catch (err) {
        setError('Failed to fetch marks distribution data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Deduplicate subjects
  const subjects = Array.from(new Set(data.map((item) => item.subject)));

  // Deduplicate exams, but only for the selected subject
  const exams = Array.from(
    new Set(
      data
        .filter((item) => item.subject === selectedSubject)
        .map((item) => item.exam)
    )
  );

  // Deduplicate years
  const years = Array.from(new Set(data.map((item) => item.year)));

  // Find distribution for the selected filters
  const distribution = data.find(
    (item) =>
      item.subject === selectedSubject &&
      item.exam === selectedExam &&
      item.year === selectedYear
  )?.distribution;

  // Prepare chart data
  const chartData = {
    labels: ['0-20', '21-40', '41-60', '61-80', '81-100'],
    datasets: [
      {
        label: `Marks Distribution for ${selectedSubject || '...'} - ${
          selectedExam || '...'
        } - Year ${selectedYear || '...'}`,
        data: distribution || [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Marks Distribution by Subject, Exam, and Year',
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutBounce' as const,
    },
  };

  const handleResetFilters = () => {
    setSelectedSubject('');
    setSelectedExam('');
    setSelectedYear('');
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        {error}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Marks Distribution by Subject, Exam, and Year
      </h1>

      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Subject Dropdown */}
          <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="subjectSelect" className="mb-1 font-medium">
              Subject
            </label>
            <select
              id="subjectSelect"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedExam('');
                setSelectedYear('');
              }}
              className="p-2 border rounded-md"
            >
              <option value="">-- Select Subject --</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Exam Dropdown */}
          <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="examSelect" className="mb-1 font-medium">
              Exam
            </label>
            <select
              id="examSelect"
              value={selectedExam}
              onChange={(e) => {
                setSelectedExam(e.target.value);
                setSelectedYear('');
              }}
              disabled={!selectedSubject}
              className={`p-2 border rounded-md ${
                !selectedSubject ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="">-- Select Exam --</option>
              {exams.map((exam) => (
                <option key={exam} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="flex flex-col w-full md:w-1/4">
            <label htmlFor="yearSelect" className="mb-1 font-medium">
              Year
            </label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              disabled={!selectedExam}
              className={`p-2 border rounded-md ${
                !selectedExam ? 'bg-gray-100 cursor-not-allowed' : ''
              }`}
            >
              <option value="">-- Select Year --</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 md:mt-8 hover:bg-gray-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {distribution ? (
          <Bar data={chartData} options={chartOptions} />
        ) : (
          <p className="text-center text-gray-500">
            Select all filters to view the distribution chart.
          </p>
        )}
      </div>
    </div>
  );
};

export default MarksDistribution;