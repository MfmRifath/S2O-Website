import React, { useEffect, useState } from 'react';
import { StudentDTO } from '../types/StudentDTO';
import { createStudent, deleteStudent, getAllStudents } from '../api/studentApi';


const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newStudent, setNewStudent] = useState<StudentDTO>({
    id: 0,
    name: '',
    stream: '',
    year: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getAllStudents();
      setStudents(data);
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const handleCreateStudent = async () => {
    if (!newStudent.name || !newStudent.stream || !newStudent.year) {
      alert('Please fill all fields!');
      return;
    }

    const created = await createStudent(newStudent);
    setStudents([...students, created]);
    setNewStudent({ id: 0, name: '', stream: '', year: '' });
  };

  const handleDeleteStudent = async (id: number) => {
    await deleteStudent(id);
    setStudents(students.filter((student) => student.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      {/* Add Student Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Add New Student</h2>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Stream"
            value={newStudent.stream}
            onChange={(e) => setNewStudent({ ...newStudent, stream: e.target.value })}
            className="border rounded-lg p-2"
          />
          <input
            type="text"
            placeholder="Year"
            value={newStudent.year}
            onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
            className="border rounded-lg p-2"
          />
          <button
            onClick={handleCreateStudent}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Add Student
          </button>
        </div>
      </div>

      {/* Students List */}
      <h2 className="text-lg font-semibold mb-2">Students List</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Stream</th>
            <th className="border border-gray-300 px-4 py-2">Year</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{student.id}</td>
              <td className="border border-gray-300 px-4 py-2">{student.name}</td>
              <td className="border border-gray-300 px-4 py-2">{student.stream}</td>
              <td className="border border-gray-300 px-4 py-2">{student.year}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDeleteStudent(student.id)}
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

export default StudentManagement;