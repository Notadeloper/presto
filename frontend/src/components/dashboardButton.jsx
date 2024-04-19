import React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

export function DashboardButton ({ token, setToken }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  const navigate = useNavigate(); // Get the navigate function

  const goToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
  };
  return (
    <Button
      onClick={goToDashboard}
      variant="contained"
      endIcon={!belowWidth ? <HomeIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="dashboard"
      color="primary"
    >
      {!belowWidth ? 'Return to Dashboard' : <HomeIcon />}
    </Button>
  );
}
