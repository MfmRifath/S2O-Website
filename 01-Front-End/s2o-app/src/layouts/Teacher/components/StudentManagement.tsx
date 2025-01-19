import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/students';

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    name: '',
    stream: '',
    year: '',
    marks: [],
  });
  const [editMode, setEditMode] = useState(false);

  const getAllStudents = async (page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch students:', error);
      throw error;
    }
  };

  interface Student {
    id: number;
    name: string;
    stream: string;
    year: string;
    marks: number[];
  }

  const createStudent = async (student: Student): Promise<Student> => {
    try {
      const response = await axios.post<Student>(API_URL, student);
      return response.data;
    } catch (error) {
      console.error('Failed to create student:', error);
      throw error;
    }
  };

  const updateStudent = async (id: number, student: Student) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, student);
      return response.data;
    } catch (error) {
      console.error('Failed to update student:', error);
      throw error;
    }
  };

  const deleteStudent = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Failed to delete student:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data.content || []);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleCreateStudent = async () => {
    try {
      const createdStudent = await createStudent(newStudent);
      setStudents([...students, createdStudent]);
      setNewStudent({ id: 0, name: '', stream: '', year: '', marks: [] });
    } catch (error) {
      alert('Failed to create student!');
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditMode(true);
    setSelectedStudent(student);
    setNewStudent({ ...student }); // Pre-fill the form with the student's data
  };

  const handleUpdateStudent = async () => {
    try {
      if (selectedStudent) {
        const updatedStudent = await updateStudent(selectedStudent.id, newStudent);
        setStudents(
          students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
      }
      setEditMode(false);
      setNewStudent({ id: 0, name: '', stream: '', year: '', marks: [] });
    } catch (error) {
      alert('Failed to update student!');
    }
  };

  const handleDeleteStudent = async (id: number) => {
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      alert('Failed to delete student!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Student Management</h1>

      {/* Add/Edit Student Form */}
      <div>
        <h2>{editMode ? 'Edit Student' : 'Add New Student'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Stream"
          value={newStudent.stream}
          onChange={(e) => setNewStudent({ ...newStudent, stream: e.target.value })}
        />
        <input
          type="text"
          placeholder="Year"
          value={newStudent.year}
          onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
        />
        {editMode ? (
          <button onClick={handleUpdateStudent}>Update Student</button>
        ) : (
          <button onClick={handleCreateStudent}>Add Student</button>
        )}
      </div>

      {/* Students List */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stream</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.stream}</td>
              <td>{student.year}</td>
              <td>
                <button onClick={() => handleEditStudent(student)}>Edit</button>
                <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;