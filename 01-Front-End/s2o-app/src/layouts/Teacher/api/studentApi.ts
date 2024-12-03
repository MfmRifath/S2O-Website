import axios from 'axios';
import { StudentDTO } from '../types/StudentDTO';
 // Adjust based on where you defined StudentDTO

const BASE_URL = 'http://localhost:8080/api/students';

export const getAllStudents = async (): Promise<StudentDTO[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getStudentById = async (id: number): Promise<StudentDTO> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createStudent = async (student: StudentDTO): Promise<StudentDTO> => {
  const response = await axios.post(`${BASE_URL}`, student);
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};