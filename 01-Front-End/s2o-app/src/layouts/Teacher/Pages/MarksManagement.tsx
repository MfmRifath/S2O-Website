import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Modal,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";

interface Marks {
  id?: string; // Optional for new marks
  examType: string;
  marks: number;
  subject: string;
  studentId: string;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const MarksManagement: React.FC = () => {
  const [marksList, setMarksList] = useState<Marks[]>([]);
  const [open, setOpen] = useState(false);
  const [currentMark, setCurrentMark] = useState<Marks | null>(null);
  const [newMark, setNewMark] = useState<Marks>({
    examType: "",
    marks: 0,
    subject: "",
    studentId: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    try {
      const response = await axios.get<Marks[]>("http://localhost:8080/marks");
      setMarksList(response.data);
    } catch (err) {
      setError("Failed to fetch marks data.");
    }
  };

  const handleAddMark = () => {
    setCurrentMark(null);
    setNewMark({
      examType: "",
      marks: 0,
      subject: "",
      studentId: "",
    });
    setOpen(true);
  };

  const handleEditMark = (mark: Marks) => {
    setCurrentMark(mark);
    setNewMark(mark);
    setOpen(true);
  };

  const handleDeleteMark = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/marks/${id}`);
      setMarksList((prev) => prev.filter((mark) => mark.id !== id));
    } catch (err) {
      setError("Failed to delete mark.");
    }
  };

  const handleSaveMark = async () => {
    try {
      if (currentMark) {
        // Update existing mark
        const response = await axios.put(
          `http://localhost:8080/marks/${currentMark.id}`,
          newMark
        );
        setMarksList((prev) =>
          prev.map((mark) =>
            mark.id === currentMark.id ? response.data : mark
          )
        );
      } else {
        // Add new mark
        const response = await axios.post("http://localhost:8080/marks", newMark);
        setMarksList((prev) => [...prev, response.data]);
      }
      setOpen(false);
    } catch (err) {
      setError("Failed to save mark.");
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Marks Management
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddMark}>
        Add Mark
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Exam Type</strong></TableCell>
              <TableCell><strong>Subject</strong></TableCell>
              <TableCell><strong>Marks</strong></TableCell>
              <TableCell><strong>Student ID</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marksList.map((mark) => (
              <TableRow key={mark.id}>
                <TableCell>{mark.examType}</TableCell>
                <TableCell>{mark.subject}</TableCell>
                <TableCell>{mark.marks}</TableCell>
                <TableCell>{mark.studentId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEditMark(mark)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDeleteMark(mark.id!)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {currentMark ? "Edit Mark" : "Add Mark"}
          </Typography>
          {error && (
            <Typography color="error" style={{ marginBottom: "10px" }}>
              {error}
            </Typography>
          )}
          <TextField
            label="Exam Type"
            fullWidth
            value={newMark.examType}
            onChange={(e) => setNewMark({ ...newMark, examType: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Subject"
            fullWidth
            value={newMark.subject}
            onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Marks"
            type="number"
            fullWidth
            value={newMark.marks}
            onChange={(e) => setNewMark({ ...newMark, marks: parseInt(e.target.value) })}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Student ID"
            fullWidth
            value={newMark.studentId}
            onChange={(e) => setNewMark({ ...newMark, studentId: e.target.value })}
            style={{ marginBottom: "10px" }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseModal} style={{ marginRight: "10px" }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSaveMark}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MarksManagement;