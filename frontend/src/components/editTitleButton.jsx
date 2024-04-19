import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export function EditTitleButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<EditIcon />} aria-label="edit title" size='small' color='secondary'>
      Edit Title
    </Button>
  )
}
