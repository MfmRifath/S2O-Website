import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Grid, TextField, MenuItem, Card, CardContent } from '@mui/material';
import marksService, { Marks } from '../Service/marksService';
import studentService, { Student } from '../Service/studentService';

// Validation Schema
const MarksSchema = Yup.object().shape({
  studentId: Yup.string().required('Student ID is required'),
  subject: Yup.string().required('Subject is required'),
  marks: Yup.number().min(0).max(100).required('Marks are required'),
  examType: Yup.mixed<'MID_TERM' | 'FINAL' | 'UNIT_TEST'>()
    .oneOf(['MID_TERM', 'FINAL', 'UNIT_TEST'], 'Invalid exam type')
    .required('Exam type is required'),
});

const MarksManagement = () => {
  const [marksList, setMarksList] = useState<Marks[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    // Fetch students based on the selected year
    const fetchStudents = async () => {
      try {
        const response = await studentService.getStudentsByYear(selectedYear);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [selectedYear]);

  useEffect(() => {
    // Fetch marks data on component mount
    const fetchMarks = async () => {
      try {
        const response = await marksService.getMarksByStudent('studentId1'); // Replace with dynamic ID as needed
        setMarksList(response.data);
      } catch (error) {
        console.error('Error fetching marks:', error);
      }
    };

    fetchMarks();
  }, []);

  const handleAddMarks = async (values: Marks, resetForm: () => void) => {
    try {
      await marksService.addMarks(values);
      setMarksList((prev) => [...prev, values]);
      resetForm();
    } catch (error) {
      console.error('Error adding marks:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await marksService.deleteMarks(id);
      setMarksList((prev) => prev.filter((mark) => mark.id !== id));
    } catch (error) {
      console.error('Error deleting marks:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Marks Management
      </Typography>

      {/* Year Selection */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Select Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            fullWidth
          >
            {[2022, 2023, 2024].map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          studentId: '',
          subject: '',
          marks: 0,
          examType: 'MID_TERM' as 'MID_TERM' | 'FINAL' | 'UNIT_TEST',
        }}
        validationSchema={MarksSchema}
        onSubmit={(values, { resetForm }) => {
          handleAddMarks(values, resetForm);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  select
                  name="studentId"
                  label="Student"
                  fullWidth
                  error={touched.studentId && !!errors.studentId}
                  helperText={touched.studentId && errors.studentId}
                >
                  {students.map((student) => (
                    <MenuItem key={student.id} value={student.id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="subject"
                  label="Subject"
                  fullWidth
                  error={touched.subject && !!errors.subject}
                  helperText={touched.subject && errors.subject}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="marks"
                  label="Marks"
                  type="number"
                  fullWidth
                  error={touched.marks && !!errors.marks}
                  helperText={touched.marks && errors.marks}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  select
                  name="examType"
                  label="Exam Type"
                  fullWidth
                  error={touched.examType && !!errors.examType}
                  helperText={touched.examType && errors.examType}
                >
                  <MenuItem value="MID_TERM">Mid Term</MenuItem>
                  <MenuItem value="FINAL">Final</MenuItem>
                  <MenuItem value="UNIT_TEST">Unit Test</MenuItem>
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Add Marks
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Marks List
      </Typography>

      <Grid container spacing={2}>
        {marksList.map((mark) => (
          <Grid item xs={12} sm={6} md={4} key={mark.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{mark.subject}</Typography>
                <Typography>Marks: {mark.marks}</Typography>
                <Typography>Exam Type: {mark.examType}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(mark.id!)}
                  style={{ marginTop: '10px' }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MarksManagement;