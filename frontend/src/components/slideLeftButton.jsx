import React from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export function SlideLeftButton ({ onClick }) {
  return (
    <IconButton onClick={onClick} aria-label="slide left" sx={{ padding: '20px 0px' }}>
      <KeyboardArrowLeftIcon />
    </IconButton>
  )
}
