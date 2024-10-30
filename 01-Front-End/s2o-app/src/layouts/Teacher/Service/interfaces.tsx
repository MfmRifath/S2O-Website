// src/interfaces/Student.ts
export interface Student {
  studentId: number;
  studentName: string;
  stream: string;
  year: Year;
}

// src/interfaces/StudentMark.ts
export interface StudentMark {
  markId: number;
  mark: number;
  subject: Subject;
}

// src/interfaces/Subject.ts
export interface Subject {
  subjectId: number;
  subjectName: string;
  term: Term;
}

// src/interfaces/Term.ts
export interface Term {
  termId: number;
  termName: string;
  year: Year;
  subjects: Subject[];
}

// src/interfaces/Year.ts
export interface Year {
  yearId: number;
  yearValue: number;
  terms: Term[];
}
