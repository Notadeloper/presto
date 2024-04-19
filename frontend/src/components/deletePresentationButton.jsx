import React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';

export function DeletePresentationButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="error"
      endIcon={!belowWidth ? <DeleteIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="delete presentation"
      size='small'
    >
      {!belowWidth ? 'Delete Presentation' : <DeleteIcon />}
    </Button>
  );
}
