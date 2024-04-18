import React from 'react';
import Button from '@mui/material/Button';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

export function ReturnToPresentationButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<KeyboardReturnIcon />} aria-label="return to presentation button">
      Return to Presentation
    </Button>
  )
}
