import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export function EditTitleButton ({ presentation }) {
  return (
    <Button variant="contained" endIcon={<EditIcon />}>
      Edit Title
    </Button>
  )
}
