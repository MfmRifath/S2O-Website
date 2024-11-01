export interface Year {
  yearId: number;
  yearValue: number;
  terms: Term[]; // A list of terms associated with the year
}

export interface Term {
  termId: number;
  termName: string;
  year: Year | null; // The year associated with the term (optional to avoid circular dependency during instantiation)
  subjects: Subject[]; // A list of subjects associated with the term
}

export interface Subject {
  subjectId: number;
  subjectName: string;
  term: Term | null; // The term associated with the subject
  studentMark?: StudentMark; // Optional field for the student's mark in this subject
}
export interface Student {
  studentId: number;
  studentName: string;
  stream: string;
  year: Year | null; // The year associated with the student
}

export interface StudentMark {
  markId: number;
  mark: number;
  subject: Subject | null; // The subject associated with the mark
  student: Student | null; // The student associated with the mark
}
