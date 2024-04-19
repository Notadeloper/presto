import React from 'react';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import useMediaQuery from '@mui/material/useMediaQuery';

export function SlideRearrangeButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:700px)');
  return (
<<<<<<< HEAD
    <Button onClick={onClick} variant="contained" endIcon={<SwapHorizIcon />} aria-label="slide rearranger button" size='small' color='quaternary'>
      Rearrange Slides
=======
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <SwapHorizIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="slide rearranger button"
      size='small'
    >
      {!belowWidth ? 'Rearrange Slides' : <SwapHorizIcon />}
>>>>>>> c988d5960f25e02c6d9eb5b29218c9fabaf58cbf
    </Button>
  );
}
