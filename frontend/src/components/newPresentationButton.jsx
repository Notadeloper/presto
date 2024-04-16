import React from 'react';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export function NewPresentationButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<NoteAddIcon />} aria-label="new presentation">
      New Presentation
    </Button>
  )
}
