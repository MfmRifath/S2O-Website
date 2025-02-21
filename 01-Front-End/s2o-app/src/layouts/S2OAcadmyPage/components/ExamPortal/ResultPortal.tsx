import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ResultSheet } from './Result';

interface Exam {
  id: number;
  name: string;
  date: string;
}

export const ResultPortal = () => {
  const [nic, setNic] = useState('');
  const [examId, setExamId] = useState('');
  const [error, setError] = useState({ nic: '', examId: '' });
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);

  // Fetch exam list on component mount
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('/api/exams');
        setExams(response.data);
      } catch (err) {
        console.error('Error fetching exams:', err);
      }
    };
    fetchExams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors: { nic: string; examId: string } = { nic: '', examId: '' };

    // Validate NIC: must be 12 digits.
    if (!nic.trim()) {
      errors.nic = 'NIC is required';
    } else if (!/^\d{12}$/.test(nic)) {
      errors.nic = 'NIC must be a 12-digit number';
    }
    if (!examId) {
      errors.examId = 'Exam is required';
    }
    setError(errors);

    if (!errors.nic && !errors.examId) {
      setLoading(true);
      try {
        // Call backend endpoint with NIC and examId (as number)
        const response = await axios.get('/api/marks/result', {
          params: { nic, examId: Number(examId) }
        });
        setResultData(response.data);
      } catch (err) {
        console.error('Error fetching result:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md p-6 transform transition duration-500 hover:scale-105">
        <div className="text-center mb-6">
          <img
            className="mx-auto mb-4 w-28"
            src={require('./../../../../Images/s2o-academy.jpg')}
            alt="Academy Logo"
          />
          <h1 className="text-3xl font-bold text-gray-800">Result Portal</h1>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="nic" className="block text-gray-700 font-medium mb-1">
              NIC
            </label>
            <input
              id="nic"
              type="text"
              placeholder="Enter NIC"
              maxLength={12}
              pattern="\d{12}"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                error.nic ? 'border-red-500' : 'border-gray-300'
              }`}
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              aria-describedby="nic-error"
            />
            {error.nic && (
              <p id="nic-error" className="mt-1 text-sm text-red-600">
                {error.nic}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="examId" className="block text-gray-700 font-medium mb-1">
              Exam
            </label>
            <div className="relative">
              <select
                id="examId"
                className={`w-full border rounded-lg px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
                  error.examId ? 'border-red-500' : 'border-gray-300'
                }`}
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                aria-describedby="examId-error"
              >
                <option value="" disabled>
                  Select Exam
                </option>
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>
            {error.examId && (
              <p id="examId-error" className="mt-1 text-sm text-red-600">
                {error.examId}
              </p>
            )}
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

      {/* Display the result sheet if result data exists */}
      {resultData && (
        <div className="w-full max-w-3xl mt-8">
          <ResultSheet results={resultData} />
        </div>
      )}
    </div>
  );
};