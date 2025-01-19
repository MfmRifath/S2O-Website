import React, { useEffect, useState } from 'react';
import { ExamDTO } from '../types/ExamDTO';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/exams'; // Update this to match your backend URL


const ExamManagement: React.FC = () => {
  const [exams, setExams] = useState<ExamDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newExam, setNewExam] = useState<ExamDTO>({
    id: 0,
    name: '',
    date: '',
  });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await getAllExams();
        setExams(data);
      } catch (error) {
        alert('Failed to fetch exams!');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  const handleCreateExam = async () => {
    if (!newExam.name || !newExam.date) {
      alert('Please fill all fields!');
      return;
    }

    try {
      const createdExam = await createExam(newExam);
      setExams([...exams, createdExam]);
      setNewExam({ id: 0, name: '', date: '' });
    } catch (error) {
      alert('Failed to create exam!');
    }
  };

  const handleDeleteExam = async (id: number) => {
    try {
      await deleteExam(id);
      setExams(exams.filter((exam) => exam.id !== id));
    } catch (error) {
      alert('Failed to delete exam!');
    }
  };
  const getAllExams = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching exams:', error);
      throw error;
    }
  };
  if (loading) return <div>Loading...</div>;

  const createExam = async (exam: ExamDTO) => {
    try {
      const response = await axios.post(API_URL, exam);
      return response.data;
    } catch (error) {
      console.error('Error creating exam:', error);
      throw error;
    }
  };
  const deleteExam = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting exam:', error);
      throw error;
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Exam Management</h1>

      {/* Add Exam Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add New Exam</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Exam Name"
            value={newExam.name}
            onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
            className="border rounded-lg p-2"
          />
          <input
            type="date"
            placeholder="Exam Date"
            value={newExam.date}
            onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
            className="border rounded-lg p-2"
          />
          <button
            onClick={handleCreateExam}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Add Exam
          </button>
        </div>
      </div>

      {/* Exams List */}
      <h2 className="text-lg font-semibold mb-2">Exams List</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{exam.id}</td>
              <td className="border border-gray-300 px-4 py-2">{exam.name}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(exam.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteExam(exam.id)}
                  className="bg-red-500 text-white rounded-lg px-4 py-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamManagement;