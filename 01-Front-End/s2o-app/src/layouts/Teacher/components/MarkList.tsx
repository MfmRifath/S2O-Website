import React, { useState, useEffect } from "react";

import { getAllMarks, createMark, updateMark, deleteMark } from "../api/markApi";
import { MarkDTO } from "../types/MarkDTOs";

const MarksManagement: React.FC = () => {
  const [marks, setMarks] = useState<MarkDTO[]>([]);
  const [newMark, setNewMark] = useState<MarkDTO>({
    id: 0,
    marks: 0,
    maxMarks: 0,
    studentDTO: { id: 0, name: "", stream: "", year: "", marks: [] },
    subjectDTO: {
      id: 0, name: "",
      stream: ""
    },
    examDTO: { id: 0, name: "", date: "" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      const data = await getAllMarks();
      setMarks(data);
      setLoading(false);
    };

    fetchMarks();
  }, []);

  const handleCreateMark = async () => {
    const createdMark = await createMark(newMark);
    setMarks([...marks, createdMark]);
    setNewMark({
      id: 0,
      marks: 0,
      maxMarks: 0,
      studentDTO: { id: 0, name: "", stream: "", year: "", marks: [] },
      subjectDTO: {
        id: 0, name: "",
        stream: ""
      },
      examDTO: { id: 0, name: "", date: "" },
    });
  };

  const handleDeleteMark = async (id: number) => {
    await deleteMark(id);
    setMarks(marks.filter((mark) => mark.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Marks Management</h1>
      <div>
        <input
          type="number"
          placeholder="Marks"
          value={newMark.marks}
          onChange={(e) => setNewMark({ ...newMark, marks: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Max Marks"
          value={newMark.maxMarks}
          onChange={(e) => setNewMark({ ...newMark, maxMarks: parseFloat(e.target.value) })}
        />
        <button onClick={handleCreateMark}>Add Mark</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marks</th>
            <th>Max Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.id}</td>
              <td>{mark.marks}</td>
              <td>{mark.maxMarks}</td>
              <td>
                <button onClick={() => handleDeleteMark(mark.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksManagement;