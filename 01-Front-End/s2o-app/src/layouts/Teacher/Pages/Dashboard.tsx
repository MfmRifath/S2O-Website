import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  const [marksData, setMarksData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [dashboardMetrics, setDashboardMetrics] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    averageMarks: 0,
    topPerformers: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [marksResponse, performanceResponse, metricsResponse] = await Promise.all([
          axios.get('http://localhost:8080/marks/all'), // All marks data
          axios.get('http://localhost:8080/performance/all'), // Performance overview
          axios.get('http://localhost:8080/dashboard/metrics'), // Key metrics
        ]);

        setMarksData(marksResponse.data);
        setPerformanceData(performanceResponse.data);
        setDashboardMetrics(metricsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ marginBottom: '20px' }}>
        {[
          { label: 'Total Students', value: dashboardMetrics.totalStudents },
          { label: 'Total Subjects', value: dashboardMetrics.totalSubjects },
          { label: 'Average Marks', value: dashboardMetrics.averageMarks },
          { label: 'Top Performers', value: dashboardMetrics.topPerformers },
        ].map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                backgroundColor: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                  {metric.label}
                </Typography>
                <Typography variant="h4" sx={{ color: '#555555' }}>
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Marks Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={marksData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="marks" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                Performance Tracking
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="studentName" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="averageMarks" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;