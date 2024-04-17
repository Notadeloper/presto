import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export function EditThumbnailButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<EditIcon />} aria-label="edit thumbnail">
      Edit Thumbnail
    </Button>
  )
}
