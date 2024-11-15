import React, { useEffect, useState } from "react";
import {
  getAllStudentsWithDetails,
  createStudentMark,
  updateStudentMark,
} from "../Service/api";
import {
  StudentDetailsDTO,
  TermDTO,
  SubjectDTO,
  YearDTO,
} from "../Service/interfaces";
import "./MarksPanel.css"; // CSS file for custom styles

const MarksPanel: React.FC = () => {
  const [studentDetails, setStudentDetails] = useState<StudentDetailsDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // States for filters and search
  const [searchName, setSearchName] = useState("");
  const [filterYearId, setFilterYearId] = useState<number | null>(null);
  const [filterTermId, setFilterTermId] = useState<number | null>(null);
  const [filterSubjectId, setFilterSubjectId] = useState<number | null>(null);

  // States for form to add or update marks
  const [selectedYearId, setSelectedYearId] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  );
  const [selectedTermId, setSelectedTermId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [mark, setMark] = useState<number | null>(null);

  useEffect(() => {
    loadStudentDetails();
  }, []);

  const loadStudentDetails = async () => {
    setIsLoading(true);
    try {
      const response = await getAllStudentsWithDetails();
      if (response && response.data) {
        setStudentDetails(response.data);
      }
    } catch (error) {
      setErrorMessage("Failed to load student details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMark = async () => {
    if (selectedStudentId && selectedSubjectId && mark !== null) {
      try {
        const existingMark = studentDetails
          .find((student) => student.studentId === selectedStudentId)
          ?.terms?.flatMap((term) => term.subjects || [])
          .find(
            (subject) => subject.subjectId === selectedSubjectId
          )?.studentMarkDTO;

        if (existingMark) {
          await updateStudentMark(existingMark.markId, {
            markId: existingMark.markId,
            mark,
          });
          setErrorMessage("Mark updated successfully!");
        } else {
          await createStudentMark(selectedSubjectId, mark);
          setErrorMessage("Mark added successfully!");
        }

        loadStudentDetails();
        resetForm();
      } catch (error) {
        setErrorMessage("Failed to save mark");
      }
    } else {
      setErrorMessage("Please fill in all fields to save the mark.");
    }
  };

  const resetForm = () => {
    setSelectedYearId(null);
    setSelectedStudentId(null);
    setSelectedTermId(null);
    setSelectedSubjectId(null);
    setMark(null);
  };

  // Function to filter rows based on search and filter criteria
  const getFilteredRows = () => {
    return studentDetails
      .filter((student) =>
        student.studentName.toLowerCase().includes(searchName.toLowerCase())
      )
      .filter((student) =>
        filterYearId ? student.year?.yearId === filterYearId : true
      )
      .flatMap(
        (student) =>
          student.terms?.flatMap((term) =>
            term.subjects
              ?.filter((subject) => {
                const matchesTerm = filterTermId
                  ? term.termId === filterTermId
                  : true;
                const matchesSubject = filterSubjectId
                  ? subject.subjectId === filterSubjectId
                  : true;
                return matchesTerm && matchesSubject;
              })
              .map((subject) => ({
                studentName: student.studentName,
                yearValue: student.year?.yearValue ?? "N/A",
                termName: term.termName,
                subjectName: subject.subjectName,
                mark: subject.studentMarkDTO?.mark ?? "N/A",
              }))
          ) || []
      );
  };

  return (
    <div className="marks-panel">
      <h2>Student Marks Management</h2>
      {isLoading && <div className="spinner">Loading...</div>}
      {errorMessage && (
        <div className="alert alert-error" onClick={() => setErrorMessage("")}>
          {errorMessage}
        </div>
      )}

      <div className="card">
        <h3>Add or Update Student Marks</h3>

        {/* Form to Add or Update Marks */}
        <div className="form-group">
          <label>Year:</label>
          <select
            value={selectedYearId ?? ""}
            onChange={(e) => {
              setSelectedYearId(Number(e.target.value));
              setSelectedStudentId(null);
              setSelectedTermId(null);
              setSelectedSubjectId(null);
            }}
            className="dropdown"
          >
            <option value="">Select Year</option>
            {Array.from(new Set(studentDetails.map((student) => student.year)))
              .filter((year): year is YearDTO => year !== undefined)
              .map((year) => (
                <option key={year.yearId} value={year.yearId}>
                  {year.yearValue}
                </option>
              ))}
          </select>
        </div>

        {selectedYearId && (
          <div className="form-group">
            <label>Student:</label>
            <select
              value={selectedStudentId ?? ""}
              onChange={(e) => {
                setSelectedStudentId(Number(e.target.value));
                setSelectedTermId(null);
                setSelectedSubjectId(null);
              }}
              className="dropdown"
            >
              <option value="">Select Student</option>
              {studentDetails
                .filter((student) => student.year?.yearId === selectedYearId)
                .map((student) => (
                  <option key={student.studentId} value={student.studentId}>
                    {student.studentName}
                  </option>
                ))}
            </select>
          </div>
        )}

        {selectedStudentId && (
          <div className="form-group">
            <label>Term:</label>
            <select
              value={selectedTermId ?? ""}
              onChange={(e) => {
                setSelectedTermId(Number(e.target.value));
                setSelectedSubjectId(null);
              }}
              className="dropdown"
            >
              <option value="">Select Term</option>
              {studentDetails
                .find((student) => student.studentId === selectedStudentId)
                ?.terms?.map((term) => (
                  <option key={term.termId} value={term.termId}>
                    {term.termName}
                  </option>
                ))}
            </select>
          </div>
        )}

        {selectedTermId && (
          <div className="form-group">
            <label>Subject:</label>
            <select
              value={selectedSubjectId ?? ""}
              onChange={(e) => setSelectedSubjectId(Number(e.target.value))}
              className="dropdown"
            >
              <option value="">Select Subject</option>
              {studentDetails
                .find((student) => student.studentId === selectedStudentId)
                ?.terms?.find((term) => term.termId === selectedTermId)
                ?.subjects?.map((subject) => (
                  <option key={subject.subjectId} value={subject.subjectId}>
                    {subject.subjectName}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Mark:</label>
          <input
            type="number"
            value={mark ?? ""}
            onChange={(e) => setMark(Number(e.target.value))}
            placeholder="Enter mark"
            className="input-mark"
          />
        </div>
        <button
          onClick={handleSaveMark}
          className="btn-save"
          disabled={!selectedStudentId || !selectedSubjectId || mark === null}
        >
          Save Mark
        </button>
      </div>

      {/* Display Filtered Results with Filters in Table Header */}
      <div className="table-container">
        <table className="marks-table">
          <thead>
            <tr>
              <th>
                Student Name
                <input
                  type="text"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  placeholder="Enter name"
                  className="input-filter"
                />
              </th>
              <th>
                Year
                <select
                  value={filterYearId ?? ""}
                  onChange={(e) => setFilterYearId(Number(e.target.value))}
                  className="dropdown-filter"
                >
                  <option value="">All Years</option>
                  {Array.from(
                    new Set(
                      studentDetails.map((student) => student.year?.yearId)
                    )
                  )
                    .filter((yearId) => yearId !== undefined)
                    .map((yearId) => {
                      const year = studentDetails.find(
                        (student) => student.year?.yearId === yearId
                      )?.year;
                      return (
                        <option key={year?.yearId} value={year?.yearId}>
                          {year?.yearValue}
                        </option>
                      );
                    })}
                </select>
              </th>
              <th>
                Term
                <select
                  value={filterTermId ?? ""}
                  onChange={(e) => setFilterTermId(Number(e.target.value))}
                  className="dropdown-filter"
                >
                  <option value="">All Terms</option>
                  {Array.from(
                    new Set(
                      studentDetails.flatMap((student) =>
                        student.terms?.map((term) => term.termId)
                      )
                    )
                  )
                    .filter((termId) => termId !== undefined)
                    .map((termId) => {
                      const term = studentDetails
                        .flatMap((student) => student.terms)
                        .find((term) => term?.termId === termId);
                      return (
                        <option key={term?.termId} value={term?.termId}>
                          {term?.termName}
                        </option>
                      );
                    })}
                </select>
              </th>
              <th>
                Subject
                <select
                  value={filterSubjectId ?? ""}
                  onChange={(e) => setFilterSubjectId(Number(e.target.value))}
                  className="dropdown-filter"
                >
                  <option value="">All Subjects</option>
                  {Array.from(
                    new Set(
                      studentDetails.flatMap((student) =>
                        student.terms?.flatMap((term) =>
                          term.subjects?.map((subject) => subject.subjectId)
                        )
                      )
                    )
                  )
                    .filter((subjectId) => subjectId !== undefined)
                    .map((subjectId) => {
                      const subject = studentDetails
                        .flatMap((student) => student.terms)
                        .flatMap((term) => term?.subjects || [])
                        .find((subject) => subject?.subjectId === subjectId);
                      return (
                        <option
                          key={subject?.subjectId}
                          value={subject?.subjectId}
                        >
                          {subject?.subjectName}
                        </option>
                      );
                    })}
                </select>
              </th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredRows().map((row, index) => (
              <tr key={index}>
                <td>{row?.studentName}</td>
                <td>{row?.yearValue}</td>
                <td>{row?.termName}</td>
                <td>{row?.subjectName}</td>
                <td>{row?.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarksPanel;
