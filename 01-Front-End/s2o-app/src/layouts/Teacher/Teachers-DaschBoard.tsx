// src/components/TeachersDashboard.tsx
import React, { useEffect, useState } from "react";
import {
  Student,
  StudentMark,
  Subject,
  Term,
  Year,
} from "./Service/interfaces";
import AnalysisPanel from "./Components/AnalysePanal";
import MarksPanel from "./Components/MarksPanal";
import StudentsPanel from "./Components/StudentPanal";
import {
  fetchStudents,
  fetchStudentMarks,
  fetchSubjects,
  fetchTerms,
  fetchYears,
} from "./Service/api";

const TeachersDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<StudentMark[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [years, setYears] = useState<Year[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setStudents(await fetchStudents());
      setMarks(await fetchStudentMarks());
      setSubjects(await fetchSubjects());
      setTerms(await fetchTerms());
      setYears(await fetchYears());
    };
    loadData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Teacher's Dashboard</h1>
      <StudentsPanel students={students} setStudents={setStudents} />
      <MarksPanel marks={marks} setMarks={setMarks} />
      <AnalysisPanel marks={marks} subjects={subjects} />
    </div>
  );
};

export default TeachersDashboard;
