import { ExamDTO } from "./ExamDTO";
import { StudentDTO } from "./StudentDTO";
import { SubjectDTO } from "./SubjectDTO";

// src/types/markTypes.ts
export interface MarkDTO {
  id: number;
  studentDTO: StudentDTO; // Optional name for display
  subjectDTO: SubjectDTO; // ID for the subject
  examDTO: ExamDTO; // ID for the exam
  marks: number; // Marks scored
  maxMarks: number; // Maximum possible marks
}
  
  export interface PerformanceDTO {
    studentId: number;
    studentName: string;
    stream: string;
    subjectId: number;
    subjectName: string;
    examId: number;
    examName: string;
    marks: number;
    maxMarks: number;
    percentage: number;
  }
  
  export interface SubjectPerformanceDTO {
    subjectId: number;
    subjectName: string;
    totalMarksObtained: number;
    totalMaxMarks: number;
    averagePercentage: number;
  }