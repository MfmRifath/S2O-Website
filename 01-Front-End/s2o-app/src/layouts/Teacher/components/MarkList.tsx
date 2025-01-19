import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { StudentDTO } from '../types/StudentDTO';
import { SubjectDTO } from '../types/SubjectDTO';
import { ExamDTO } from '../types/ExamDTO';
import { MarkDTO } from '../types/MarkDTOs';
axios.defaults.baseURL = 'http://localhost:8080'; // Backend URL on port 8080

const MarksManagement: React.FC = () => {
  const [students, setStudents] = useState<StudentDTO[]>([]);
  const [subjects, setSubjects] = useState<SubjectDTO[]>([]);
  const [exams, setExams] = useState<ExamDTO[]>([]);
  const [marks, setMarks] = useState<MarkDTO[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentDTO[]>([]); // For filtered results
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({ name: '', year: '', subject: '' });
  const [newMark, setNewMark] = useState<MarkDTO>({
    id: 0,
    marks: 0,
    maxMarks: 100,
    studentDTO: { id: 0, name: '', stream: '', year: '', marks: [] },
    subjectDTO: { id: 0, name: '', stream: '' },
    examDTO: { id: 0, name: '', date: '' },
  });
  const [editingMark, setEditingMark] = useState<MarkDTO | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Fetch students, subjects, and exams
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, subjectsRes, examsRes, marksRes] = await Promise.all([
          axios.get('/api/students', { params: { page: 0, size: 10 } }),
          axios.get('/api/subjects'),
          axios.get('/api/exams'),
          axios.get('/api/marks'),
        ]);
        setStudents(studentsRes.data.content || []);
        setSubjects(subjectsRes.data || []);
        setFilteredStudents(studentsRes.data.content || []); // Initialize filtered students
        setExams(examsRes.data || []);
        setMarks(marksRes.data || []);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Excel file upload
  // Handle Excel file upload
  const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
  
    const file = event.target.files[0];
  
    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please upload a valid Excel file (.xlsx or .xls).');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setActionLoading(true);
      const response = await axios.post('/api/marks/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setMarks((prev) => [...prev, ...response.data]); // Update marks list
      setSuccess('Marks uploaded successfully!');
      setError('');
      console.log('Uploaded Marks:', response.data); // Log uploaded marks
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError('Invalid file format or content. Please check the Excel file and try again.');
      } else if (err.response?.status === 500) {
        setError('Server error while processing the file. Please try again later.');
      } else {
        setError('Failed to upload marks. Please try again.');
      }
    } finally {
      setActionLoading(false);
      event.target.value = ''; // Reset file input
    }
  };
// Apply filters
const applyFilters = () => {
  let results = [...students];
  if (filters.name) {
    results = results.filter((student) =>
      student.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }
  if (filters.year) {
    results = results.filter((student) => student.year === filters.year);
  }
  if (filters.subject) {
    results = results.filter((student) =>
      student.marks.some((mark) => mark.subjectDTO.name === filters.subject)
    );
  }
  setFilteredStudents(results);
};

// Reset filters
const resetFilters = () => {
  setFilters({ name: '', year: '', subject: '' });
  setFilteredStudents(students);
};
// Handle filter input changes
const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFilters((prev) => ({ ...prev, [name]: value }));
};

  // Add or update mark
  const handleSaveMark = async () => {
    if (
      !newMark.studentDTO.id ||
      !newMark.subjectDTO.id ||
      !newMark.examDTO.id ||
      newMark.marks < 0 ||
      isNaN(newMark.marks)
    ) {
      setError('All fields are required, and marks must be a positive number.');
      return;
    }

    try {
      setActionLoading(true);
      const response = editingMark
        ? await axios.put(`/api/marks/${editingMark.id}`, editingMark)
        : await axios.post('/api/marks', newMark);
      setMarks((prev) =>
        editingMark
          ? prev.map((mark) => (mark.id === editingMark.id ? response.data : mark))
          : [...prev, response.data]
      );
      resetMarkForm();
    } catch (err) {
      setError('Failed to save mark. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Edit mark
  const handleEditMark = (mark: MarkDTO) => {
    setEditingMark(mark);
    setNewMark(mark);
  };
  const saveUploadedMarksToDatabase = async () => {
    try {
      setActionLoading(true);
      const response = await axios.post('/api/marks/bulk-save', marks); // Example endpoint
      setSuccess('Marks saved to database successfully!');
      setError('');
      setMarks([]); // Clear marks after saving
    } catch (err) {
      setError('Failed to save marks to database. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };
  // Delete mark
  const handleDeleteMark = async (id: number) => {
    try {
      setActionLoading(true);
      await axios.delete(`/api/marks/${id}`);
      setMarks((prev) => prev.filter((mark) => mark.id !== id));
    } catch (err) {
      setError('Failed to delete mark. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Reset form
  const resetMarkForm = () => {
    setNewMark({
      id: 0,
      marks: 0,
      maxMarks: 100,
      studentDTO: { id: 0, name: '', stream: '', year: '', marks: [] },
      subjectDTO: { id: 0, name: '', stream: '' },
      examDTO: { id: 0, name: '', date: '' },
    });
    setEditingMark(null);
    setError('');
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">Marks Management</h1>

      {/* Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      {/* Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">{editingMark ? 'Edit Mark' : 'Add New Mark'}</h2>
        <div className="grid grid-cols-3 gap-4">
          <select
            className="border rounded p-2"
            value={editingMark ? editingMark.studentDTO.id : newMark.studentDTO.id}
            onChange={(e) => {
              const studentId = parseInt(e.target.value);
              const selectedStudent = students.find((s) => s.id === studentId);
              if (editingMark && selectedStudent) {
                setEditingMark({ ...editingMark, studentDTO: selectedStudent });
              } else if (selectedStudent) {
                setNewMark({ ...newMark, studentDTO: selectedStudent });
              }
            }}
          >
            <option value="0">Select Student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2"
            value={editingMark ? editingMark.subjectDTO.id : newMark.subjectDTO.id}
            onChange={(e) => {
              const subjectId = parseInt(e.target.value);
              const selectedSubject = subjects.find((s) => s.id === subjectId);
              if (editingMark && selectedSubject) {
                setEditingMark({ ...editingMark, subjectDTO: selectedSubject });
              } else if (selectedSubject) {
                setNewMark({ ...newMark, subjectDTO: selectedSubject });
              }
            }}
          >
            <option value="0">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <select
            className="border rounded p-2"
            value={editingMark ? editingMark.examDTO.id : newMark.examDTO.id}
            onChange={(e) => {
              const examId = parseInt(e.target.value);
              const selectedExam = exams.find((exam) => exam.id === examId);
              if (editingMark && selectedExam) {
                setEditingMark({ ...editingMark, examDTO: selectedExam });
              } else if (selectedExam) {
                setNewMark({ ...newMark, examDTO: selectedExam });
              }
            }}
          >
            <option value="0">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="border rounded p-2"
            placeholder="Marks"
            value={editingMark ? editingMark.marks : newMark.marks}
            onChange={(e) =>
              editingMark
                ? setEditingMark({ ...editingMark, marks: parseFloat(e.target.value) })
                : setNewMark({ ...newMark, marks: parseFloat(e.target.value) })
            }
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSaveMark}
            disabled={actionLoading}
          >
            {editingMark ? 'Update Mark' : 'Add Mark'}
          </button>

          {editingMark && (
            <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={resetMarkForm}>
              Cancel
            </button>
          )}
        </div>
      </div>
     {/* Excel Upload Section */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Upload Marks via Excel</h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          className="border rounded p-2 mb-4"
        />
        <button
          onClick={saveUploadedMarksToDatabase}
          disabled={marks.length === 0 || actionLoading}
          className={`px-4 py-2 rounded ${
            marks.length === 0 || actionLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {actionLoading ? 'Saving...' : 'Save to Database'}
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Filter Students</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Search by Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="border rounded p-2"
          />
          <select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">Filter by Year</option>
            {Array.from(new Set(students.map((student) => student.year))).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">Filter by Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Marks List */}
      <h2 className="text-lg font-semibold mb-2">Marks List</h2>
      <table className="table-auto w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Student</th>
            <th className="p-2">Stream</th>
            <th className="p-2">Year</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Marks</th>
            <th className="p-2">Exam</th>
            <th className="p-2">Max Marks</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredStudents.map((student, index) => (
            <tr
              key={student.id}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="p-2">{student.id}</td>
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.stream}</td>
              <td className="p-2">{student.year}</td>
              {student.marks.map((mark) => (
                <React.Fragment key={mark.id}>
                  <td className="p-2">
                     {mark.subjectDTO.name}
                  </td>
                  <td className="p-2">
                     {mark.marks}
                  </td>
                  <td className="p-2">
                     {mark.examDTO.name}
                  </td>
                  <td className="p-2">
                     {mark.maxMarks}
                  </td>
                  <td className="p-2">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleEditMark(mark)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteMark(mark.id)}
                    >
                      Delete
                    </button>
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
              
        </tbody>
      </table>
    </div>
  );
};

export default MarksManagement;