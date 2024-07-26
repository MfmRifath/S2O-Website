import React from 'react';
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Header />
        <Box sx={{ mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            This is the home page of the admin dashboard. Here you can manage users, view reports, analyze data, and change settings.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    User Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage user accounts, roles, and permissions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Reports
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Generate and view various reports.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Analyze data and monitor performance.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Configure system settings and preferences.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Donation Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage and track donations.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
