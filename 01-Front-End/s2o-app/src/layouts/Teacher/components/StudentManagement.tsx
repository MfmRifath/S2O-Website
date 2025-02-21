import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = 'http://localhost:8080/api/students';

interface Student {
  id: number;
  name: string;
  stream: string;
  year: string;
  nic: string;
  marks: number[];
}

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    name: '',
    stream: '',
    year: '',
    nic: '',
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMode && selectedStudent) {
      try {
        const updatedStudent = await updateStudent(selectedStudent.id, newStudent);
        setStudents(
          students.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        setEditMode(false);
      } catch (error) {
        alert('Failed to update student!');
      }
    } else {
      try {
        const createdStudent = await createStudent(newStudent);
        setStudents([...students, createdStudent]);
      } catch (error) {
        alert('Failed to create student!');
      }
    }
    // Reset form
    setNewStudent({ id: 0, name: '', stream: '', year: '', marks: [], nic: '' });
    setSelectedStudent(null);
  };

  const handleEditStudent = (student: Student) => {
    setEditMode(true);
    setSelectedStudent(student);
    setNewStudent({ ...student }); // Pre-fill the form with the student's data
  };

  const handleDeleteStudent = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((student) => student.id !== id));
      } catch (error) {
        alert('Failed to delete student!');
      }
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Student Management</h1>
      
      {/* Add/Edit Student Form */}
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{editMode ? 'Edit Student' : 'Add New Student'}</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">Name</label>
              <input
                type="text"
                id="studentName"
                className="form-control"
                placeholder="Enter student name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">NIC</label>
              <input
                type="text"
                id="studentName"
                className="form-control"
                placeholder="Enter student name"
                value={newStudent.nic}
                onChange={(e) => setNewStudent({ ...newStudent, nic: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentStream" className="form-label">Stream</label>
              <input
                type="text"
                id="studentStream"
                className="form-control"
                placeholder="Enter stream"
                value={newStudent.stream}
                onChange={(e) => setNewStudent({ ...newStudent, stream: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="studentYear" className="form-label">Year</label>
              <input
                type="text"
                id="studentYear"
                className="form-control"
                placeholder="Enter year"
                value={newStudent.year}
                onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editMode ? 'Update Student' : 'Add Student'}
            </button>
            {editMode && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditMode(false);
                  setNewStudent({ id: 0, name: '', stream: '', year: '', marks: [],nic: '' });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Students List */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>NIC</th>
            <th>Stream</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.nic}</td>
                <td>{student.stream}</td>
                <td>{student.year}</td>
                <td>
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => handleEditStudent(student)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteStudent(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                No students available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentManagement;