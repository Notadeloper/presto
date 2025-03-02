import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import useMediaQuery from '@mui/material/useMediaQuery';

export function ReturnToPresentationButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <KeyboardReturnIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="return to presentation button"
    >
      {!belowWidth ? 'Return to Presentation' : <KeyboardReturnIcon />}
    </Button>
  )
}
