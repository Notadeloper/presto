import React from 'react';
import Button from '@mui/material/Button';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

export function EditThumbnailButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<PhotoLibraryIcon />} aria-label="edit thumbnail" size='small'>
      Edit Thumbnail
    </Button>
  )
}
