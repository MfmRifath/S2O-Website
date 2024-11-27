import axios from 'axios';

const BASE_URL = 'http://localhost:8080/performance';

// Define the type for Performance
interface Performance {
  id?: string; // Optional for newly created performance records
  studentId: string;
  averageMarks: number;
  examCount: number;
  stream: 'BIOLOGY' | 'PHYSICAL_SCIENCE'; // Enum for stream types
}

// Get a student's performance by student ID
const getPerformanceByStudent = (studentId: string) => {
  return axios.get<Performance>(`${BASE_URL}/${studentId}`);
};

// Optional: If you want to calculate performance server-side and save
const calculateAndSavePerformance = (studentId: string) => {
  return axios.post<Performance>(`${BASE_URL}/calculate`, { studentId });
};

export default {
  getPerformanceByStudent,
  calculateAndSavePerformance, // Optional, based on backend support
};