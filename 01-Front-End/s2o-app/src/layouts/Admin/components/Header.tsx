import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box sx={{ mt: 6  }}> {/* Add margin at the top */}
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(90deg, #4CAF50 0%, #81C784 100%)',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Admin Dashboard
          </Typography>
          <Box>
            <Typography
              variant="body2"
              component="div"
              sx={{
                color: '#ffffff',
                opacity: 0.8,
              }}
            >
              Welcome, Admin!
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;