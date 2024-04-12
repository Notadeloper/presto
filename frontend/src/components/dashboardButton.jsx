import React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

export function DashboardButton ({ token, setToken }) {
  return (
    <Button variant="contained" endIcon={<HomeIcon />}>
      Return to Dashboard
    </Button>
  );
}
