// src/components/StudentsPanel.tsx
import React, { useState } from "react";
import { createStudent, deleteStudent } from "../Service/api";
import { Student } from "../Service/interfaces";

interface StudentsPanelProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentsPanel: React.FC<StudentsPanelProps> = ({
  students,
  setStudents,
}) => {
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentStream, setNewStudentStream] = useState("");

  const addStudent = async () => {
    const newStudent = await createStudent({
      studentName: newStudentName,
      stream: newStudentStream,
      year: { yearId: 1, yearValue: 2024, terms: [] },
    });
    setStudents([...students, newStudent]);
  };

  return (
    <div className="students-panel">
      <h2>Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.studentName} - {student.stream}
            <button onClick={() => deleteStudent(student.studentId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="Student Name"
      />
      <input
        value={newStudentStream}
        onChange={(e) => setNewStudentStream(e.target.value)}
        placeholder="Stream"
      />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
};

export default StudentsPanel;
