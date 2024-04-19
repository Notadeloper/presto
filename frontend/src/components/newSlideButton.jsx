import React from 'react';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

export function NewSlideButton ({ onClick, presentationId }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={() => onClick(presentationId)}
      variant="contained"
      endIcon={!belowWidth ? <NoteAddIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="new slide"
      size='small'
    >
      {!belowWidth ? 'New Slide' : <NoteAddIcon />}
    </Button>
  )
}
