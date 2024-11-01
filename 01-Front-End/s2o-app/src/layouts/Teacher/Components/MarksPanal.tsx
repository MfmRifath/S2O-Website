import React, { useEffect, useState } from "react";
import {
  getAllStudents,
  getAllSubjects,
  getAllStudentMarks,
  createStudentMark,
  updateStudentMark,
  deleteStudentMark,
} from "../Service/api";
import { Student, Subject, StudentMark } from "../Service/interfaces";

const MarksPanel: React.FC = () => {
  const [marks, setMarks] = useState<StudentMark[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [markDetails, setMarkDetails] = useState<StudentMark | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Load students, subjects, and marks on component mount
  useEffect(() => {
    loadStudents();
    loadSubjects();
    loadMarks();
  }, []);

  const loadStudents = async () => {
    const response = await getAllStudents();
    if (response && Array.isArray(response.data)) setStudents(response.data);
  };

  const loadSubjects = async () => {
    const response = await getAllSubjects();
    if (response && Array.isArray(response.data)) {
      setSubjects(response.data);
    } else {
      setSubjects([]); // Fallback to an empty array if data is not an array
    }
  };

  const loadMarks = async () => {
    setIsLoading(true);
    const response = await getAllStudentMarks();
    if (response && Array.isArray(response.data)) {
      setMarks(response.data);
    } else {
      setMarks([]); // Fallback to an empty array if data is not an array
    }
    setIsLoading(false);
  };

  const handleSaveMark = async () => {
    setIsLoading(true);
    if (markDetails) {
      if (isEditMode) {
        await updateStudentMark(markDetails.markId, markDetails);
      } else {
        await createStudentMark(markDetails);
      }
      setMarkDetails(null);
      setIsEditMode(false);
      loadMarks();
      setShowModal(false);
    }
    setIsLoading(false);
  };

  const handleDeleteMark = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this mark?")) {
      await deleteStudentMark(id);
      loadMarks();
    }
  };

  const openModal = (mark: StudentMark | null = null) => {
    setMarkDetails(mark);
    setIsEditMode(!!mark);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Marks Management</h2>

      {isLoading && <div className="spinner"></div>}

      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Subject</th>
            <th>Mark</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(marks) &&
            marks.map((mark) => (
              <tr key={mark.markId}>
                <td>{mark.student?.studentName}</td>
                <td>{mark.subject?.subjectName}</td>
                <td>{mark.mark}</td>
                <td>
                  <button
                    className="button-primary"
                    onClick={() => openModal(mark)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-danger"
                    onClick={() => handleDeleteMark(mark.markId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className="button-primary" onClick={() => openModal()}>
        Add Mark
      </button>

      {showModal && (
        <div className="modal">
          <h3>{isEditMode ? "Edit Mark" : "Add Mark"}</h3>
          <select
            value={markDetails?.student?.studentId || ""}
            onChange={(e) =>
              setMarkDetails({
                ...markDetails!,
                student:
                  students.find(
                    (student) => student.studentId === +e.target.value
                  ) || null,
              })
            }
          >
            <option value="">Select Student</option>
            {Array.isArray(students) &&
              students.map((student) => (
                <option key={student.studentId} value={student.studentId}>
                  {student.studentName}
                </option>
              ))}
          </select>
          <select
            value={markDetails?.subject?.subjectId || ""}
            onChange={(e) =>
              setMarkDetails({
                ...markDetails!,
                subject:
                  subjects.find(
                    (subject) => subject.subjectId === +e.target.value
                  ) || null,
              })
            }
          >
            <option value="">Select Subject</option>
            {Array.isArray(subjects) &&
              subjects.map((subject) => (
                <option key={subject.subjectId} value={subject.subjectId}>
                  {subject.subjectName}
                </option>
              ))}
          </select>
          <input
            type="number"
            value={markDetails?.mark || ""}
            onChange={(e) =>
              setMarkDetails({
                ...markDetails!,
                mark: +e.target.value,
              })
            }
            placeholder="Enter Mark"
          />
          <button className="button-primary" onClick={handleSaveMark}>
            {isEditMode ? "Update" : "Save"}
          </button>
          <button
            className="button-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default MarksPanel;
