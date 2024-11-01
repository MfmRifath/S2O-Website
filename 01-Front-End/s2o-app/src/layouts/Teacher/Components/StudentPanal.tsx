import React, { useEffect, useState } from "react";
import {
  getAllStudents,
  updateStudent,
  createStudent,
  deleteStudent,
  getAllYears,
  createYear,
  updateYear,
  deleteYear,
  getTermsByYearId,
  createTerm,
  updateTerm,
  deleteTerm,
  getSubjectsByTermId,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../Service/api";
import { Student, Year, Term, Subject } from "../Service/interfaces";

const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [years, setYears] = useState<Year[]>([]);
  const [yearDetails, setYearDetails] = useState<Year | null>(null);
  const [terms, setTerms] = useState<Term[]>([]);
  const [termDetails, setTermDetails] = useState<Term | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectDetails, setSubjectDetails] = useState<Subject | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isYearEditMode, setIsYearEditMode] = useState(false);
  const [isTermEditMode, setIsTermEditMode] = useState(false);
  const [isSubjectEditMode, setIsSubjectEditMode] = useState(false);

  useEffect(() => {
    loadStudents();
    loadYears();
  }, []);

  const loadStudents = async () => {
    const response = await getAllStudents();
    if (response) setStudents(response.data);
  };

  const loadYears = async () => {
    const response = await getAllYears();
    if (response) setYears(response.data);
  };

  const loadTerms = async (yearId: number) => {
    try {
      const response = await getTermsByYearId(yearId);
      setTerms(response?.data || []); // Ensure `terms` is an array even if the API response is unexpected
    } catch (error) {
      console.error("Error loading terms:", error);
      setTerms([]); // Set an empty array in case of an error to avoid breaking the component
    }
  };

  const loadSubjects = async (termId: number) => {
    const response = await getSubjectsByTermId(termId);
    if (response) setSubjects(response.data);
  };

  const handleSaveStudent = async () => {
    if (studentDetails) {
      if (isEditMode) {
        await updateStudent(studentDetails.studentId, studentDetails);
      } else {
        await createStudent(studentDetails);
      }
      setStudentDetails(null);
      setIsEditMode(false);
      loadStudents();
    }
  };

  const handleSaveYear = async () => {
    if (yearDetails) {
      if (isYearEditMode) {
        await updateYear(yearDetails.yearId, yearDetails);
      } else {
        await createYear(yearDetails);
      }
      setYearDetails(null);
      setIsYearEditMode(false);
      loadYears();
    }
  };

  const handleSaveTerm = async () => {
    if (termDetails) {
      if (isTermEditMode) {
        await updateTerm(termDetails.termId, termDetails);
      } else {
        await createTerm({ ...termDetails, year: yearDetails });
      }
      setTermDetails(null);
      setIsTermEditMode(false);
      if (yearDetails) loadTerms(yearDetails.yearId);
    }
  };

  const handleSaveSubject = async () => {
    if (subjectDetails && termDetails) {
      if (isSubjectEditMode) {
        await updateSubject(subjectDetails.subjectId, subjectDetails);
      } else {
        await createSubject({ ...subjectDetails, term: termDetails });
      }
      setSubjectDetails(null);
      setIsSubjectEditMode(false);
      loadSubjects(termDetails.termId);
    }
  };

  const handleDeleteStudent = async (id: number) => {
    await deleteStudent(id);
    loadStudents();
  };

  const handleDeleteYear = async (id: number) => {
    await deleteYear(id);
    loadYears();
  };

  const handleDeleteTerm = async (id: number) => {
    await deleteTerm(id);
    if (yearDetails) loadTerms(yearDetails.yearId);
  };

  const handleDeleteSubject = async (id: number) => {
    await deleteSubject(id);
    if (termDetails) loadSubjects(termDetails.termId);
  };

  return (
    <div>
      <h2>Student Management</h2>

      {/* Student Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stream</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.stream}</td>
              <td>{student.year?.yearValue}</td>
              <td>
                <button
                  onClick={() => {
                    setStudentDetails(student);
                    setIsEditMode(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteStudent(student.studentId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          setStudentDetails({
            studentId: 0,
            studentName: "",
            stream: "",
            year: null,
          });
          setIsEditMode(false);
        }}
      >
        Add Student
      </button>

      {studentDetails && (
        <div>
          <h3>{isEditMode ? "Edit Student" : "Add Student"}</h3>
          <input
            type="text"
            value={studentDetails.studentName}
            onChange={(e) =>
              setStudentDetails({
                ...studentDetails,
                studentName: e.target.value,
              })
            }
            placeholder="Name"
          />
          <input
            type="text"
            value={studentDetails.stream}
            onChange={(e) =>
              setStudentDetails({ ...studentDetails, stream: e.target.value })
            }
            placeholder="Stream"
          />
          <select
            value={studentDetails.year?.yearId || ""}
            onChange={(e) =>
              setStudentDetails({
                ...studentDetails,
                year:
                  years.find((year) => year.yearId === +e.target.value) || null,
              })
            }
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year.yearId} value={year.yearId}>
                {year.yearValue}
              </option>
            ))}
          </select>
          <button onClick={handleSaveStudent}>
            {isEditMode ? "Update" : "Save"}
          </button>
          <button onClick={() => setStudentDetails(null)}>Cancel</button>
        </div>
      )}

      <hr />
      <h2>Year Management</h2>

      {/* Year Table */}
      <table>
        <thead>
          <tr>
            <th>Year ID</th>
            <th>Year Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => (
            <tr key={year.yearId}>
              <td>{year.yearId}</td>
              <td>{year.yearValue}</td>
              <td>
                <button
                  onClick={() => {
                    setYearDetails(year);
                    setIsYearEditMode(true);
                    loadTerms(year.yearId); // Load terms for the selected year
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteYear(year.yearId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setYearDetails({
            yearId: 0,
            yearValue: new Date().getFullYear(),
            terms: [],
          });
          setIsYearEditMode(false);
        }}
      >
        Add Year
      </button>

      {yearDetails && (
        <div>
          <input
            type="number"
            value={yearDetails.yearValue}
            onChange={(e) =>
              setYearDetails({
                ...yearDetails,
                yearValue: +e.target.value,
              })
            }
            placeholder="Year Value"
          />
          <button onClick={handleSaveYear}>
            {isYearEditMode ? "Update Year" : "Save Year"}
          </button>
          <button onClick={() => setYearDetails(null)}>Cancel</button>
        </div>
      )}

      <hr />

      {/* Term Management */}
      {yearDetails && (
        <div>
          <h3>Terms in Year {yearDetails.yearValue}</h3>
          <table>
            <thead>
              <tr>
                <th>Term ID</th>
                <th>Term Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {terms.map((term) => (
                <tr key={term.termId}>
                  <td>{term.termId}</td>
                  <td>{term.termName}</td>
                  <td>
                    <button
                      onClick={() => {
                        setTermDetails(term);
                        setIsTermEditMode(true);
                        loadSubjects(term.termId); // Load subjects for the selected term
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteTerm(term.termId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              setTermDetails({
                termId: 0,
                termName: "",
                subjects: [],
                year: yearDetails,
              });
              setIsTermEditMode(false);
            }}
          >
            Add Term
          </button>

          {termDetails && (
            <div>
              <input
                type="text"
                value={termDetails.termName}
                onChange={(e) =>
                  setTermDetails({ ...termDetails, termName: e.target.value })
                }
                placeholder="Term Name"
              />
              <button onClick={handleSaveTerm}>
                {isTermEditMode ? "Update Term" : "Save Term"}
              </button>
              <button onClick={() => setTermDetails(null)}>Cancel</button>
            </div>
          )}
        </div>
      )}

      <hr />

      {/* Subject Management */}
      {termDetails && (
        <div>
          <h3>Subjects in Term {termDetails.termName}</h3>
          <table>
            <thead>
              <tr>
                <th>Subject ID</th>
                <th>Subject Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.subjectId}>
                  <td>{subject.subjectId}</td>
                  <td>{subject.subjectName}</td>
                  <td>
                    <button
                      onClick={() => {
                        setSubjectDetails(subject);
                        setIsSubjectEditMode(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubject(subject.subjectId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              setSubjectDetails({
                subjectId: 0,
                subjectName: "",
                term: termDetails,
              });
              setIsSubjectEditMode(false);
            }}
          >
            Add Subject
          </button>

          {subjectDetails && (
            <div>
              <input
                type="text"
                value={subjectDetails.subjectName}
                onChange={(e) =>
                  setSubjectDetails({
                    ...subjectDetails,
                    subjectName: e.target.value,
                  })
                }
                placeholder="Subject Name"
              />
              <button onClick={handleSaveSubject}>
                {isSubjectEditMode ? "Update Subject" : "Save Subject"}
              </button>
              <button onClick={() => setSubjectDetails(null)}>Cancel</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default StudentManagement;
