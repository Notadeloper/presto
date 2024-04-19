import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import useMediaQuery from '@mui/material/useMediaQuery';

export function EditTitleButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:700px)');
  return (
<<<<<<< HEAD
    <Button onClick={onClick} variant="contained" endIcon={<EditIcon />} aria-label="edit title" size='small' color='secondary'>
      Edit Title
=======
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <EditIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="edit title"
      size='small'
    >
      {!belowWidth ? 'Edit Title' : <EditIcon />}
>>>>>>> c988d5960f25e02c6d9eb5b29218c9fabaf58cbf
    </Button>
  )
}
