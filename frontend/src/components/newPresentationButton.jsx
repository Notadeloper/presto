import React from 'react';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

export function NewPresentationButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <Button
        onClick={onClick}
        variant="contained"
        color="secondary"
        size="large"
        endIcon={!belowWidth ? <NoteAddIcon /> : null}
        style={{ padding: belowWidth ? '8px' : '' }}
        aria-label="new presentation"
      >
        {!belowWidth ? 'New Presentation' : <NoteAddIcon />}
      </Button>
    </div>
  );
}
