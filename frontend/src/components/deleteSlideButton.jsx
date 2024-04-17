import React from 'react';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';

export function DeleteSlideButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" color="error" endIcon={<RemoveIcon />} aria-label="delete slide">
      Delete Slide
    </Button>
  );
}
