import React from 'react';
import { Button, Box } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import useMediaQuery from '@mui/material/useMediaQuery';

export function NewPresentationButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 20px 0' }}>
      <Button
        onClick={onClick}
        variant="contained"
        color="secondary"
        size="large"
        endIcon={!belowWidth ? <NoteAddIcon /> : null}
        style={{ padding: belowWidth ? '6px' : '' }}
        aria-label="new presentation"
      >
        {!belowWidth ? 'New Presentation' : <NoteAddIcon />}
      </Button>
    </Box>
  )
}
