import axios from 'axios';


const BASE_URL = 'http://localhost:8080/students';
export interface Student {
    id: string; // Make sure 'id' is not optional
    name: string;
    stream: string;
    year: number;
  }
const getStudents = () => axios.get<Student[]>(`${BASE_URL}`);
const addStudent = (student: Student) => axios.post<Student>(`${BASE_URL}`, student);
const updateStudent = (id: string, student: Student) => axios.put<Student>(`${BASE_URL}/${id}`, student);
const deleteStudent = (id: string) => axios.delete(`${BASE_URL}/${id}`);
const getStudentsByYear = (year: number) => {
    return axios.get<Student[]>(`http://localhost:8080/students/year/${year}`);
  };
export default {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentsByYear,
};