import React, { useEffect, useState } from "react";
import axios from "axios";

interface ExamInfo {
  examType: string;
  subject: string;
  marks: number;
  term: string;
  year: number;
}

interface StudentInfoDto {
  studentId?: string;
  studentName: string;
  stream: string;
  year: number;
  exams: ExamInfo[];
}

const StudentDataComponent: React.FC = () => {
  const [students, setStudents] = useState<StudentInfoDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);

  // Student data for forms
  const [newStudent, setNewStudent] = useState<StudentInfoDto>({
    studentName: "",
    stream: "BIOLOGY",
    year: new Date().getFullYear(),
    exams: [],
  });

  const [selectedStudent, setSelectedStudent] = useState<StudentInfoDto | null>(null);
  const [newExam, setNewExam] = useState<ExamInfo>({
    examType: "",
    subject: "",
    marks: 0,
    term: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get<StudentInfoDto[]>(
          "http://localhost:8080/student-data"
        );
        setStudents(response.data);
      } catch (err) {
        setError("Failed to fetch student data.");
      }
    };

    fetchStudentData();
  }, []);

  // Add a new student
  const handleAddStudent = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/student-data",
        newStudent
      );
      setStudents((prev) => [...prev, response.data]);
      setAddOpen(false);
      setNewStudent({
        studentName: "",
        stream: "BIOLOGY",
        year: new Date().getFullYear(),
        exams: [],
      });
    } catch (err) {
      setError("Failed to add new student.");
    }
  };

  // Edit a student
  const handleEditStudent = async () => {
    if (selectedStudent) {
      try {
        const response = await axios.put(
          `http://localhost:8080/student-data/${selectedStudent.studentId}`,
          selectedStudent
        );
        setStudents((prev) =>
          prev.map((student) =>
            student.studentId === selectedStudent.studentId
              ? response.data
              : student
          )
        );
        setEditOpen(false);
        setSelectedStudent(null);
      } catch (err) {
        setError("Failed to edit student.");
      }
    }
  };

  // Delete a student
  const handleDeleteStudent = async (studentId: string) => {
    try {
      await axios.delete(`http://localhost:8080/student-data/${studentId}`);
      setStudents((prev) => prev.filter((student) => student.studentId !== studentId));
    } catch (err) {
      setError("Failed to delete student.");
    }
  };

  // Add an exam to a student
  const handleAddExam = async () => {
    if (selectedStudent) {
      try {
        const response = await axios.post(
          `http://localhost:8080/student-data/${selectedStudent.studentId}/exams`,
          newExam
        );
        setStudents((prev) =>
          prev.map((student) =>
            student.studentId === selectedStudent.studentId
              ? { ...student, exams: [...student.exams, response.data] }
              : student
          )
        );
        setExamOpen(false);
        setNewExam({
          examType: "",
          subject: "",
          marks: 0,
          term: "",
          year: new Date().getFullYear(),
        });
      } catch (err) {
        setError("Failed to add exam.");
      }
    }
  };

  return (
    <div className="p-6 mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Student Management</h1>

      {/* Add Student Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setAddOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Add Student
        </button>
      </div>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Display Students */}
      {students.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No students found. Add a new student to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {students.map((student) => (
            <div
              key={student.studentId}
              className="bg-white shadow-lg rounded-lg p-6"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {student.studentName}{" "}
                <span className="text-gray-500">({student.stream})</span>
              </h2>
              <p className="text-gray-700">Year: {student.year}</p>
              <h3 className="text-xl font-medium mt-4">Exams:</h3>
              {student.exams.length === 0 ? (
                <p className="text-gray-500">No exam data available.</p>
              ) : (
                <div className="mt-2">
                  {student.exams.map((exam, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-3 rounded-lg mb-2"
                    >
                      <p className="text-sm text-gray-600">
                        <strong>Exam Type:</strong> {exam.examType}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Subject:</strong> {exam.subject}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Marks:</strong> {exam.marks}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Term:</strong> {exam.term}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Year:</strong> {exam.year}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setEditOpen(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Edit Student
                </button>
                <button
                  onClick={() => handleDeleteStudent(student.studentId!)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Delete Student
                </button>
                <button
                  onClick={() => {
                    setSelectedStudent(student);
                    setExamOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                  Add Exam
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals for Add, Edit, and Add Exam */}
      {addOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={newStudent.studentName}
              onChange={(e) =>
                setNewStudent({ ...newStudent, studentName: e.target.value })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <label className="block text-gray-700 mb-2">Stream</label>
            <select
              value={newStudent.stream}
              onChange={(e) =>
                setNewStudent({ ...newStudent, stream: e.target.value })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            >
              <option value="BIOLOGY">BIOLOGY</option>
              <option value="PHYSICAL_SCIENCE">PHYSICAL_SCIENCE</option>
            </select>
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="number"
              value={newStudent.year}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  year: parseInt(e.target.value, 10),
                })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setAddOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Student</h2>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={selectedStudent.studentName}
              onChange={(e) =>
                setSelectedStudent((prev) =>
                  prev ? { ...prev, studentName: e.target.value } : null
                )
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <label className="block text-gray-700 mb-2">Stream</label>
            <select
              value={selectedStudent.stream}
              onChange={(e) =>
                setSelectedStudent((prev) =>
                  prev ? { ...prev, stream: e.target.value } : null
                )
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            >
              <option value="BIOLOGY">BIOLOGY</option>
              <option value="PHYSICAL_SCIENCE">PHYSICAL_SCIENCE</option>
            </select>
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="number"
              value={selectedStudent.year}
              onChange={(e) =>
                setSelectedStudent((prev) =>
                  prev
                    ? { ...prev, year: parseInt(e.target.value, 10) }
                    : null
                )
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleEditStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {examOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Exam</h2>
            <label className="block text-gray-700 mb-2">Exam Type</label>
            <input
              type="text"
              value={newExam.examType}
              onChange={(e) =>
                setNewExam({ ...newExam, examType: e.target.value })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={newExam.subject}
              onChange={(e) =>
                setNewExam({ ...newExam, subject: e.target.value })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <label className="block text-gray-700 mb-2">Marks</label>
            <input
              type="number"
              value={newExam.marks}
              onChange={(e) =>
                setNewExam({ ...newExam, marks: parseInt(e.target.value, 10) })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <label className="block text-gray-700 mb-2">Term</label>
            <input
              type="text"
              value={newExam.term}
              onChange={(e) =>
                setNewExam({ ...newExam, term: e.target.value })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <label className="block text-gray-700 mb-2">Year</label>
            <input
              type="number"
              value={newExam.year}
              onChange={(e) =>
                setNewExam({ ...newExam, year: parseInt(e.target.value, 10) })
              }
              className="border border-gray-300 w-full p-2 rounded-lg mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setExamOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExam}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDataComponent;