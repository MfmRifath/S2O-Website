import axios from 'axios';
import { MarkDTO, PerformanceDTO, SubjectPerformanceDTO } from '../types/MarkDTOs';


const BASE_URL = 'http://localhost:8080/api/marks';

export const getAllMarks = async (): Promise<MarkDTO[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const createMark = async (mark: MarkDTO): Promise<MarkDTO> => {
  const response = await axios.post(`${BASE_URL}`, mark);
  return response.data;
};

export const updateMark = async (id: number, mark: MarkDTO): Promise<MarkDTO> => {
  const response = await axios.put(`${BASE_URL}/${id}`, mark);
  return response.data;
};



export const getMarkById = async (id: number): Promise<MarkDTO> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const saveMark = async (mark: MarkDTO): Promise<MarkDTO> => {
  const response = await axios.post(`${BASE_URL}`, mark);
  return response.data;
};

export const deleteMark = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

export const getPerformance = async (): Promise<PerformanceDTO[]> => {
  const response = await axios.get(`${BASE_URL}/performance`);
  return response.data;
};

export const getPerformanceByStream = async (): Promise<Record<string, PerformanceDTO[]>> => {
  const response = await axios.get(`${BASE_URL}/performance/stream`);
  return response.data;
};

export const getPerformanceBySubject = async (): Promise<SubjectPerformanceDTO[]> => {
  const response = await axios.get(`${BASE_URL}/performance/subject`);
  return response.data;
};