export interface Year {
  yearId: number;
  yearValue: number;
  terms?: Term[]; // lazy-loaded, so this is optional
  students?: Student[]; // lazy-loaded, so this is optional
}

export interface Term {
  termId: number;
  termName: string;
  year?: Year;
  subjects?: Subject[]; // List of subjects related to the term
}

export interface Subject {
  subjectId: number;
  subjectName: string;
  term?: Term;
  studentMark?: StudentMark; // One-to-One relation with StudentMark
}

export interface Student {
  studentId: number;
  studentName: string;
  stream: string;
  year?: Year; // reference to the Year entity
}

export interface StudentMark {
  markId: number; // Updated to allow null
  mark: number; // Updated to allow null
  ssubjectId?: number; // Reference to the Student entity
  subject?: Subject | null; // Reference to the Subject entity
}
// interfaces.ts
export interface StudentMarkDTO {
  markId: number;
  mark: number;
}

export interface SubjectDTO {
  subjectId: number;
  subjectName: string;
  studentMarkDTO?: StudentMarkDTO;
}

export interface TermDTO {
  termId: number;
  termName: string;
  subjects?: SubjectDTO[];
}

export interface YearDTO {
  yearId: number;
  yearValue: number;
}

export interface StudentDetailsDTO {
  studentId: number;
  studentName: string;
  stream: string;
  terms?: TermDTO[];
  year?: YearDTO;
}
