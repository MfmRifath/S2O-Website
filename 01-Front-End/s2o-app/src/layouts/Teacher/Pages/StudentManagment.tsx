import React, { useEffect, useState } from 'react';
import { useTable, Column } from 'react-table';
import { Button, Typography, Grid, Modal, TextField } from '@mui/material';
import studentService, { Student } from '../Service/studentService';

// Modal Styles
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  padding: 4,
};

const StudentManagement = () => {
  const [data, setData] = useState<Student[]>([]);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    id: '',
    name: '',
    stream: '',
    year: 1,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await studentService.getStudents();
        setData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudents();
  }, []);

  const columns = React.useMemo<Column<Student>[]>(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Stream', accessor: 'stream' },
      { Header: 'Year', accessor: 'year' },
      {
        Header: 'Actions',
        Cell: ({ row }: any) => (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(row.original.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  const handleDelete = async (id: string) => {
    try {
      await studentService.deleteStudent(id);
      setData((prevData) => prevData.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student: Student) => {
    setCurrentStudent(student);
    setOpen(true);
  };

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentStudent) {
        await studentService.updateStudent(currentStudent.id, newStudent);
        setData((prevData) =>
          prevData.map((student) =>
            student.id === currentStudent.id ? newStudent : student
          )
        );
      } else {
        const response = await studentService.addStudent(newStudent);
        setData((prevData) => [...prevData, response.data]);
      }
      setOpen(false);
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setNewStudent({
      id: '',
      name: '',
      stream: '',
      year: 1,
    });
  };
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Fix: use a string for boxShadow
    padding: '16px', // Ensure padding is a string
  };
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Student Management
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddStudent}>
        Add Student
      </Button>

      <table {...tableInstance.getTableProps()} style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ borderBottom: '1px solid black' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...tableInstance.getTableBodyProps()}>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: '1px solid gray' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <Typography variant="h6" gutterBottom>
            {currentStudent ? 'Edit Student' : 'Add Student'}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Stream"
            fullWidth
            value={newStudent.stream}
            onChange={(e) => setNewStudent({ ...newStudent, stream: e.target.value })}
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Year"
            type="number"
            fullWidth
            value={newStudent.year}
            onChange={(e) => setNewStudent({ ...newStudent, year: parseInt(e.target.value) })}
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentManagement;