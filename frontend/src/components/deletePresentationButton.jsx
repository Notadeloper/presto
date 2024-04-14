import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export function DeletePresentationButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" color="error" endIcon={<DeleteIcon />}>
      Delete Presentation
    </Button>
  );
}
