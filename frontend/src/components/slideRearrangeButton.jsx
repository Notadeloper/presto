import React from 'react';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export function SlideRearrangeButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<SwapHorizIcon />} aria-label="slide rearranger button">
      Rearrange Slides
    </Button>
  );
}
