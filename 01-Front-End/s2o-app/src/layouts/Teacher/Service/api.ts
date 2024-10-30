// src/api/api.ts
import axios from "axios";
import { Student, StudentMark, Subject, Term, Year } from "./interfaces";

// Base API URL
const API_URL = "http://localhost:8080/api";

// Student Endpoints
export const fetchStudents = async (): Promise<Student[]> => {
  const response = await axios.get<Student[]>(`${API_URL}/students`);
  return response.data;
};

export const fetchStudentById = async (id: number): Promise<Student> => {
  const response = await axios.get<Student>(`${API_URL}/students/${id}`);
  return response.data;
};

export const createStudent = async (
  studentData: Omit<Student, "studentId">
): Promise<Student> => {
  const response = await axios.post<Student>(
    `${API_URL}/students`,
    studentData
  );
  return response.data;
};

export const updateStudent = async (
  id: number,
  studentData: Partial<Student>
): Promise<Student> => {
  const response = await axios.put<Student>(
    `${API_URL}/students/${id}`,
    studentData
  );
  return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/students/${id}`);
};

// Student Mark Endpoints
export const fetchStudentMarks = async (): Promise<StudentMark[]> => {
  const response = await axios.get<StudentMark[]>(`${API_URL}/student-marks`);
  return response.data;
};

export const fetchStudentMarkById = async (
  id: number
): Promise<StudentMark> => {
  const response = await axios.get<StudentMark>(
    `${API_URL}/student-marks/${id}`
  );
  return response.data;
};

export const createStudentMark = async (
  studentMarkData: Omit<StudentMark, "markId">
): Promise<StudentMark> => {
  const response = await axios.post<StudentMark>(
    `${API_URL}/student-marks`,
    studentMarkData
  );
  return response.data;
};

export const updateStudentMark = async (
  id: number,
  studentMarkData: Partial<StudentMark>
): Promise<StudentMark> => {
  const response = await axios.put<StudentMark>(
    `${API_URL}/student-marks/${id}`,
    studentMarkData
  );
  return response.data;
};

export const deleteStudentMark = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/student-marks/${id}`);
};

// Subject Endpoints
export const fetchSubjects = async (): Promise<Subject[]> => {
  const response = await axios.get<Subject[]>(`${API_URL}/subjects`);
  return response.data;
};

export const fetchSubjectById = async (id: number): Promise<Subject> => {
  const response = await axios.get<Subject>(`${API_URL}/subjects/${id}`);
  return response.data;
};

export const createSubject = async (
  subjectData: Omit<Subject, "subjectId">
): Promise<Subject> => {
  const response = await axios.post<Subject>(
    `${API_URL}/subjects`,
    subjectData
  );
  return response.data;
};

export const updateSubject = async (
  id: number,
  subjectData: Partial<Subject>
): Promise<Subject> => {
  const response = await axios.put<Subject>(
    `${API_URL}/subjects/${id}`,
    subjectData
  );
  return response.data;
};

export const deleteSubject = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/subjects/${id}`);
};

// Term Endpoints
export const fetchTerms = async (): Promise<Term[]> => {
  const response = await axios.get<Term[]>(`${API_URL}/terms`);
  return response.data;
};

export const fetchTermById = async (id: number): Promise<Term> => {
  const response = await axios.get<Term>(`${API_URL}/terms/${id}`);
  return response.data;
};

export const createTerm = async (
  termData: Omit<Term, "termId">
): Promise<Term> => {
  const response = await axios.post<Term>(`${API_URL}/terms`, termData);
  return response.data;
};

export const updateTerm = async (
  id: number,
  termData: Partial<Term>
): Promise<Term> => {
  const response = await axios.put<Term>(`${API_URL}/terms/${id}`, termData);
  return response.data;
};

export const deleteTerm = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/terms/${id}`);
};

// Year Endpoints
export const fetchYears = async (): Promise<Year[]> => {
  const response = await axios.get<Year[]>(`${API_URL}/years`);
  return response.data;
};

export const fetchYearById = async (id: number): Promise<Year> => {
  const response = await axios.get<Year>(`${API_URL}/years/${id}`);
  return response.data;
};

export const createYear = async (
  yearData: Omit<Year, "yearId">
): Promise<Year> => {
  const response = await axios.post<Year>(`${API_URL}/years`, yearData);
  return response.data;
};

export const updateYear = async (
  id: number,
  yearData: Partial<Year>
): Promise<Year> => {
  const response = await axios.put<Year>(`${API_URL}/years/${id}`, yearData);
  return response.data;
};

export const deleteYear = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/years/${id}`);
};
