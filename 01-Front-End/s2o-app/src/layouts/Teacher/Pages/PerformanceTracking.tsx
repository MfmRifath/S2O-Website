import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

interface Performance {
  studentName: string;
  averageMarks: number;
  examCount: number;
  stream: 'BIOLOGY' | 'PHYSICAL_SCIENCE';
}

const PerformanceTracking = () => {
  const [performanceData, setPerformanceData] = useState<Performance[]>([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get<Performance[]>('http://localhost:8080/performance/all');
        setPerformanceData(response.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Performance Tracking
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Average Marks by Student
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="studentName" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="averageMarks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Exam Count by Student
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="studentName" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="examCount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Performance Summary
      </Typography>

      <Grid container spacing={2}>
        {performanceData.map((performance, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{performance.studentName}</Typography>
                <Typography>Average Marks: {performance.averageMarks}</Typography>
                <Typography>Exam Count: {performance.examCount}</Typography>
                <Typography>Stream: {performance.stream}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PerformanceTracking;