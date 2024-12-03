import axios from 'axios';
import { ExamDTO } from '../types/ExamDTO';

const BASE_URL = 'http://localhost:8080/api/exams';

export const getAllExams = async (): Promise<ExamDTO[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getExamById = async (id: number): Promise<ExamDTO> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createExam = async (exam: ExamDTO): Promise<ExamDTO> => {
  const response = await axios.post(`${BASE_URL}`, exam);
  return response.data;
};

export const deleteExam = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};