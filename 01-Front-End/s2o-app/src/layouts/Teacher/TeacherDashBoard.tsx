import React from 'react';
import { Typography, Grid, Card, CardContent, Button, Box, IconButton } from '@mui/material';
import { useSpring, animated } from '@react-spring/web'; // Import react-spring
import SchoolIcon from '@mui/icons-material/School';
import GradeIcon from '@mui/icons-material/Grade';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';

const AnimatedCard = animated(Card); // Wrap the Card component to animate it

const TeacherHome = () => {
  const navigate = useNavigate();

  // Animation for cards
  const springStyle = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 200, friction: 20 },
    delay: 200,
  });

  return (
    <Box sx={{ padding: '20px', paddingTop: '40px', backgroundColor: '#f9f9f9', minHeight: '100vh',mt :5 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#3f51b5',
          textAlign: 'center',
          marginBottom: '30px',
        }}
      >
        Management Dashboard
      </Typography>

      <Grid container spacing={4}>
        {[
          {
            title: 'Student Management',
            description: 'Add, update, and manage students.',
            icon: <SchoolIcon />,
            onClick: () => navigate('/students'),
          },
          {
            title: 'Marks Management',
            description: 'Track and update student marks.',
            icon: <GradeIcon />,
            onClick: () => navigate('/marks'),
          },
          {
            title: 'Performance Tracking',
            description: 'View and analyze student performance.',
            icon: <TrendingUpIcon />,
            onClick: () => navigate('/performance'),
          },
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <AnimatedCard
              style={{ ...springStyle }}
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
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <IconButton
                    sx={{
                      backgroundColor: '#f5f5f5',
                      color: '#3f51b5',
                      marginRight: '10px',
                      '&:hover': { backgroundColor: '#e0e0e0' },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                </Box>
                <Typography variant="body2" gutterBottom>
                  {item.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: '10px', textTransform: 'none' }}
                  onClick={item.onClick}
                >
                  {`Manage ${item.title.split(' ')[0]}`}
                </Button>
              </CardContent>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeacherHome;