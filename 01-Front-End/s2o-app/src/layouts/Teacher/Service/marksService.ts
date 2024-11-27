import axios from 'axios';

const BASE_URL = 'http://localhost:8080/marks';

export interface Marks {
    id?: string;  // Optional for new entries
    studentId: string;
    subject: string;
    marks: number;
    examType: 'MID_TERM' | 'FINAL' | 'UNIT_TEST';
}

// Get all marks for a specific student
const getMarksByStudent = (studentId: string) => {
  return axios.get<Marks[]>(`${BASE_URL}/${studentId}`);
};

// Add new marks
const addMarks = (marks: Marks) => {
  return axios.post<Marks>(BASE_URL, marks);
};

// Update existing marks
const updateMarks = (id: string, updatedMarks: Marks) => {
  return axios.put<Marks>(`${BASE_URL}/${id}`, updatedMarks);
};

// Delete marks by ID
const deleteMarks = (id: string) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export default {
  getMarksByStudent,
  addMarks,
  updateMarks,
  deleteMarks,
};