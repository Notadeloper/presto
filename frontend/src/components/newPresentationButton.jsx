import React from 'react';
import { Button, Box } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

export function NewPresentationButton ({ onClick }) {
  return (
    <Box style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 20px 0' }}>
      <Button
        onClick={onClick}
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<NoteAddIcon />}
        aria-label="new presentation"
      >
        New Presentation
      </Button>
    </Box>
  )
}
