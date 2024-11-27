import React from 'react';
import { Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Assuming React Router is being used

const TeacherHome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h3" gutterBottom>
        Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Student Management */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Student Management
              </Typography>
              <Typography variant="body2" gutterBottom>
                Add, update, and manage students.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/students')}
              >
                Manage Students
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Marks Management */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Marks Management
              </Typography>
              <Typography variant="body2" gutterBottom>
                Track and update student marks.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/marks')}
              >
                Manage Marks
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Tracking */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Performance Tracking
              </Typography>
              <Typography variant="body2" gutterBottom>
                View and analyze student performance.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/performance')}
              >
                Track Performance
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TeacherHome;