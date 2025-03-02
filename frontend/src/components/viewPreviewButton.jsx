import React from 'react';
import Button from '@mui/material/Button';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import useMediaQuery from '@mui/material/useMediaQuery';

export function ViewPreviewButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <SlideshowIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="view preview"
      size='small'
    >
      {!belowWidth ? 'View Preview' : <SlideshowIcon />}
    </Button>
  );
}
