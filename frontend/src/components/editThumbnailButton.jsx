import React from 'react';
import Button from '@mui/material/Button';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import useMediaQuery from '@mui/material/useMediaQuery';

export function EditThumbnailButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <PhotoLibraryIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="edit thumbnail"
      size='small'
    >
      {!belowWidth ? 'Edit Thumbnail' : <PhotoLibraryIcon />}
    </Button>
  )
}
