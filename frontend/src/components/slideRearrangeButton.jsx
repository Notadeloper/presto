import React from 'react';
import Button from '@mui/material/Button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import useMediaQuery from '@mui/material/useMediaQuery';

export function SlideRearrangeButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <SwapHorizIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="slide rearranger button"
      size='small'
    >
      {!belowWidth ? 'Rearrange Slides' : <SwapHorizIcon />}
    </Button>
  );
}
