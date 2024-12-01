import React from 'react';
import { Box, Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            Welcome to the Admin Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: '#757575' }}>
            This is the home page of the admin dashboard. Here you can manage users, view reports, analyze data, and change settings.
          </Typography>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            {[
              { title: 'User Management', description: 'Manage user accounts, roles, and permissions.', icon: <PeopleIcon /> },
              { title: 'Reports', description: 'Generate and view various reports.', icon: <BarChartIcon /> },
              { title: 'Analytics', description: 'Analyze data and monitor performance.', icon: <AnalyticsIcon /> },
              { title: 'Settings', description: 'Configure system settings and preferences.', icon: <SettingsIcon /> },
              { title: 'Donation Management', description: 'Manage and track donations.', icon: <VolunteerActivismIcon /> },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <IconButton
                      sx={{
                        backgroundColor: '#f5f5f5',
                        color: '#3f51b5',
                        marginBottom: '8px',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    >
                      {item.icon}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;