// src/types/markTypes.ts
export interface MarkDTO {
  id: number;
  studentId: number; // ID for the student
  studentName?: string; // Optional name for display
  subjectId: number; // ID for the subject
  subjectName?: string; // Optional name for display
  examId: number; // ID for the exam
  examName?: string; // Optional name for display
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