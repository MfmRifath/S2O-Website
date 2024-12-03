import React, { useEffect, useState } from 'react';
import { getAllMarks, createMark, updateMark, deleteMark } from '../api/markApi';
import { getAllStudents } from '../api/studentApi';
import { getAllSubjects } from '../api/subjectApi';
import { getAllExams } from '../api/examApi';
import { MarkDTO } from '../types/MarkDTOs';
import { StudentDTO } from '../types/StudentDTO';
import { SubjectDTO } from '../types/SubjectDTO';
import { ExamDTO } from '../types/ExamDTO';


const MarksList: React.FC = () => {
  const [marks, setMarks] = useState<MarkDTO[]>([]);
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [subjects, setSubjects] = useState<SubjectDTO[]>([]);
  const [exams, setExams] = useState<ExamDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingMark, setEditingMark] = useState<MarkDTO | null>(null);
  const [newMark, setNewMark] = useState<MarkDTO>({
    id: 0,
    studentId: 0,
    subjectId: 0,
    examId: 0,
    marks: 0,
    maxMarks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [marksData, studentsData, subjectsData, examsData] = await Promise.all([
        getAllMarks(),
        getAllStudents(),
        getAllSubjects(),
        getAllExams(),
      ]);
      setMarks(marksData);
      setStudents(studentsData);
      setSubjects(subjectsData);
      setExams(examsData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCreateOrUpdateMark = async () => {
    if (!newMark.studentId || !newMark.subjectId || !newMark.examId) {
      alert('Please select valid Student, Subject, and Exam!');
      return;
    }

    if (editingMark) {
      const updatedMark = await updateMark(editingMark.id, newMark);
      setMarks(marks.map((mark) => (mark.id === updatedMark.id ? updatedMark : mark)));
      setEditingMark(null);
    } else {
      const createdMark = await createMark(newMark);
      setMarks([...marks, createdMark]);
    }

    setNewMark({ id: 0, studentId: 0, subjectId: 0, examId: 0, marks: 0, maxMarks: 0 });
  };

  const handleEditMark = (mark: MarkDTO) => {
    setEditingMark(mark);
    setNewMark(mark);
  };

  const handleDeleteMark = async (id: number) => {
    await deleteMark(id);
    setMarks(marks.filter((mark) => mark.id !== id));
  };

  if (loading) return <div className="text-center text-gray-700">Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Marks List</h1>

      {/* Add/Edit Mark Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          {editingMark ? 'Edit Mark' : 'Add New Mark'}
        </h2>
        <div className="flex flex-col space-y-4">
          {/* Student Dropdown */}
          <select
            value={newMark.studentId}
            onChange={(e) => setNewMark({ ...newMark, studentId: parseInt(e.target.value, 10) })}
            className="border rounded-lg p-2"
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          {/* Subject Dropdown */}
          <select
            value={newMark.subjectId}
            onChange={(e) => setNewMark({ ...newMark, subjectId: parseInt(e.target.value, 10) })}
            className="border rounded-lg p-2"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          {/* Exam Dropdown */}
          <select
            value={newMark.examId}
            onChange={(e) => setNewMark({ ...newMark, examId: parseInt(e.target.value, 10) })}
            className="border rounded-lg p-2"
          >
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>

          {/* Marks and Max Marks */}
          <input
            type="number"
            placeholder="Marks"
            value={newMark.marks}
            onChange={(e) => setNewMark({ ...newMark, marks: parseFloat(e.target.value) })}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Max Marks"
            value={newMark.maxMarks}
            onChange={(e) => setNewMark({ ...newMark, maxMarks: parseFloat(e.target.value) })}
            className="border rounded-lg p-2"
          />
          <button
            onClick={handleCreateOrUpdateMark}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            {editingMark ? 'Update Mark' : 'Add Mark'}
          </button>
        </div>
      </div>

      {/* Marks Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Student</th>
            <th className="border border-gray-300 px-4 py-2">Subject</th>
            <th className="border border-gray-300 px-4 py-2">Exam</th>
            <th className="border border-gray-300 px-4 py-2">Marks</th>
            <th className="border border-gray-300 px-4 py-2">Max Marks</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{mark.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {students.find((s) => s.id === mark.studentId)?.name || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {subjects.find((s) => s.id === mark.subjectId)?.name || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {exams.find((e) => e.id === mark.examId)?.name || 'N/A'}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">{mark.marks}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{mark.maxMarks}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleEditMark(mark)}
                  className="bg-yellow-500 text-white rounded-lg px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMark(mark.id)}
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

export default MarksList;