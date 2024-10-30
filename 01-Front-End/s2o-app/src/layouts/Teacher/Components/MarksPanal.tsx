// src/components/MarksPanel.tsx
import React from "react";
import { deleteStudentMark } from "../Service/api";
import { StudentMark } from "../Service/interfaces";

interface MarksPanelProps {
  marks: StudentMark[];
  setMarks: React.Dispatch<React.SetStateAction<StudentMark[]>>;
}

const MarksPanel: React.FC<MarksPanelProps> = ({ marks, setMarks }) => {
  const handleDelete = async (id: number) => {
    await deleteStudentMark(id);
    setMarks(marks.filter((mark) => mark.markId !== id));
  };

  return (
    <div className="marks-panel">
      <h2>Student Marks</h2>
      <ul>
        {marks.map((mark) => (
          <li key={mark.markId}>
            {mark.subject.subjectName}: {mark.mark}
            <button onClick={() => handleDelete(mark.markId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarksPanel;
