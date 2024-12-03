import React, { useEffect, useState } from 'react';
import { ExamDTO } from '../types/ExamDTO';
import { createExam, deleteExam, getAllExams } from '../api/examApi';


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
      const data = await getAllExams();
      setExams(data);
      setLoading(false);
    };

    fetchExams();
  }, []);

  const handleCreateExam = async () => {
    if (!newExam.name || !newExam.date) {
      alert('Please fill all fields!');
      return;
    }

    const created = await createExam(newExam);
    setExams([...exams, created]);
    setNewExam({ id: 0, name: '', date: '' });
  };

  const handleDeleteExam = async (id: number) => {
    await deleteExam(id);
    setExams(exams.filter((exam) => exam.id !== id));
  };

  if (loading) return <div>Loading...</div>;

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