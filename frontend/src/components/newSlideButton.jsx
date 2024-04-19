import React from 'react';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

export function NewSlideButton ({ onClick, presentationId }) {
  const belowWidth = useMediaQuery('(max-width:700px)');
  return (
<<<<<<< HEAD
    <Button onClick={() => onClick(presentationId)} variant="contained" endIcon={<NoteAddIcon />} aria-label="new slide" size='small' color='quaternary'>
      New Slide
=======
    <Button
      onClick={() => onClick(presentationId)}
      variant="contained"
      endIcon={!belowWidth ? <NoteAddIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="new slide"
      size='small'
    >
      {!belowWidth ? 'New Slide' : <NoteAddIcon />}
>>>>>>> c988d5960f25e02c6d9eb5b29218c9fabaf58cbf
    </Button>
  )
}
