import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';

export function EditTitleButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <EditIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="edit title"
      size='small'
    >
      {!belowWidth ? 'Edit Title' : <EditIcon />}
    </Button>
  )
}
