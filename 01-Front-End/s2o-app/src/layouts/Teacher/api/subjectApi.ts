import axios from 'axios';
import { SubjectDTO } from '../types/SubjectDTO';


const BASE_URL = 'http://localhost:8080/api/subjects';

export const getAllSubjects = async (): Promise<SubjectDTO[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const getSubjectById = async (id: number): Promise<SubjectDTO> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createSubject = async (subject: SubjectDTO): Promise<SubjectDTO> => {
  const response = await axios.post(`${BASE_URL}`, subject);
  return response.data;
};

export const updateSubject = async (id: number, subject: SubjectDTO): Promise<SubjectDTO> => {
  const response = await axios.put(`${BASE_URL}/${id}`, subject);
  return response.data;
};

export const deleteSubject = async (id: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};