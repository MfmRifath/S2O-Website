import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { Typography, Grid, Card, CardContent } from '@mui/material';
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
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Students</Typography>
              <Typography variant="h4">{dashboardMetrics.totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Subjects</Typography>
              <Typography variant="h4">{dashboardMetrics.totalSubjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Marks</Typography>
              <Typography variant="h4">{dashboardMetrics.averageMarks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Performers</Typography>
              <Typography variant="h4">{dashboardMetrics.topPerformers}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
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
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;