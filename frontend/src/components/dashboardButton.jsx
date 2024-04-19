import React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export function DashboardButton ({ token, setToken }) {
  const navigate = useNavigate(); // Get the navigate function

  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
  };
  return (
    <Button onClick={goToDashboard} variant="contained" endIcon={<HomeIcon />} aria-label="dashboard" color="primary">
      Return to Dashboard
    </Button>
  );
}
