import axios, { AxiosResponse } from "axios";
import { Year, Term, Subject, StudentMark, Student } from "./interfaces";

const BASE_URL = "http://localhost:8080/api";

// Utility function to handle HTTP requests
const request = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
): Promise<AxiosResponse<T> | undefined> => {
  try {
    return await axios({ method, url, data });
  } catch (error: any) {
    console.error(
      `Error during ${method.toUpperCase()} request to ${url}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
// Year Service Functions
export const getAllYears = async (): Promise<
  AxiosResponse<Year[]> | undefined
> => request("get", `${BASE_URL}/years`);

export const getYearById = async (
  id: number
): Promise<AxiosResponse<Year> | undefined> =>
  request("get", `${BASE_URL}/years/${id}`);

export const createYear = async (
  year: Year
): Promise<AxiosResponse<Year> | undefined> =>
  request("post", `${BASE_URL}/years`, year);

export const updateYear = async (
  id: number,
  yearDetails: Year
): Promise<AxiosResponse<Year> | undefined> =>
  request("put", `${BASE_URL}/years/${id}`, yearDetails);

export const deleteYear = async (
  id: number
): Promise<AxiosResponse<void> | undefined> =>
  request("delete", `${BASE_URL}/years/${id}`);

// Term Service Functions
export const getAllTerms = async (): Promise<
  AxiosResponse<Term[]> | undefined
> => request("get", `${BASE_URL}/terms`);

export const getTermById = async (
  id: number
): Promise<AxiosResponse<Term> | undefined> =>
  request("get", `${BASE_URL}/terms/${id}`);

export const createTerm = async (
  term: Term
): Promise<AxiosResponse<Term> | undefined> =>
  request("post", `${BASE_URL}/terms`, term);

export const updateTerm = async (
  id: number,
  termDetails: Term
): Promise<AxiosResponse<Term> | undefined> =>
  request("put", `${BASE_URL}/terms/${id}`, termDetails);

export const deleteTerm = async (
  id: number
): Promise<AxiosResponse<void> | undefined> =>
  request("delete", `${BASE_URL}/terms/${id}`);

// Subject Service Functions
export const getAllSubjects = async (): Promise<
  AxiosResponse<Subject[]> | undefined
> => request("get", `${BASE_URL}/subjects`);

export const getSubjectById = async (
  id: number
): Promise<AxiosResponse<Subject> | undefined> =>
  request("get", `${BASE_URL}/subjects/${id}`);

export const createSubject = async (
  subject: Subject
): Promise<AxiosResponse<Subject> | undefined> =>
  request("post", `${BASE_URL}/subjects`, subject);

export const updateSubject = async (
  id: number,
  subjectDetails: Subject
): Promise<AxiosResponse<Subject> | undefined> =>
  request("put", `${BASE_URL}/subjects/${id}`, subjectDetails);

export const deleteSubject = async (
  id: number
): Promise<AxiosResponse<void> | undefined> =>
  request("delete", `${BASE_URL}/subjects/${id}`);

// StudentMark Service Functions
export const getAllStudentMarks = async (): Promise<
  AxiosResponse<StudentMark[]> | undefined
> => request("get", `${BASE_URL}/student-marks`);

export const getStudentMarkById = async (
  id: number
): Promise<AxiosResponse<StudentMark> | undefined> =>
  request("get", `${BASE_URL}/student-marks/${id}`);

export const createStudentMark = async (
  studentMark: StudentMark
): Promise<AxiosResponse<StudentMark> | undefined> =>
  request("post", `${BASE_URL}/student-marks`, studentMark);

export const updateStudentMark = async (
  id: number,
  studentMarkDetails: StudentMark
): Promise<AxiosResponse<StudentMark> | undefined> =>
  request("put", `${BASE_URL}/student-marks/${id}`, studentMarkDetails);

export const deleteStudentMark = async (
  id: number
): Promise<AxiosResponse<void> | undefined> =>
  request("delete", `${BASE_URL}/student-marks/${id}`);

// Student Service Functions
export const getAllStudents = async (): Promise<
  AxiosResponse<Student[]> | undefined
> => request("get", `${BASE_URL}/students`);

export const getStudentById = async (
  id: number
): Promise<AxiosResponse<Student> | undefined> =>
  request("get", `${BASE_URL}/students/${id}`);

export const createStudent = async (
  student: Student
): Promise<AxiosResponse<Student> | undefined> =>
  request("post", `${BASE_URL}/students`, student);

export const updateStudent = async (
  id: number,
  studentDetails: Student
): Promise<AxiosResponse<Student> | undefined> =>
  request("put", `${BASE_URL}/students/${id}`, studentDetails);

export const deleteStudent = async (
  id: number
): Promise<AxiosResponse<void> | undefined> =>
  request("delete", `${BASE_URL}/students/${id}`);

// Fetch terms by year ID
export const getTermsByYearId = async (
  yearId: number
): Promise<AxiosResponse<Term[]>> => {
  return await axios.get(`${BASE_URL}/years/${yearId}/terms`);
};

// Fetch subjects by term ID
export const getSubjectsByTermId = async (
  termId: number
): Promise<AxiosResponse<Subject[]>> => {
  return await axios.get(`${BASE_URL}/terms/${termId}/subjects`);
};
