import React from 'react';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export function NewSlideButton ({ onClick, presentationId }) {
  return (
    <Button onClick={() => onClick(presentationId)} variant="contained" endIcon={<NoteAddIcon />} aria-label="new slide" size='small'>
      New Slide
    </Button>
  )
}
