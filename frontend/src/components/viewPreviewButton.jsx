import React from 'react';
import Button from '@mui/material/Button';
import SlideshowIcon from '@mui/icons-material/Slideshow';

export function ViewPreviewButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<SlideshowIcon />}>
      View Preview
    </Button>
  );
}
