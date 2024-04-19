import React from 'react';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import useMediaQuery from '@mui/material/useMediaQuery';

export function DeleteSlideButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="error"
      endIcon={!belowWidth ? <RemoveIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="delete slide"
      size='small'
    >
      {!belowWidth ? 'Delete Slide' : <RemoveIcon />}
    </Button>
  );
}
