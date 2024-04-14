import React from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export function SlideRightButton ({ onClick }) {
  return (
    <IconButton onClick={onClick} aria-label="slide right">
      <KeyboardArrowRightIcon />
    </IconButton>
  )
}
