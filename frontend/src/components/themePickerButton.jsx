import React from 'react';
import Button from '@mui/material/Button';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import useMediaQuery from '@mui/material/useMediaQuery';

export function ThemePickerButton ({ onClick }) {
  const belowWidth = useMediaQuery('(max-width:680px)');
  return (
    <Button
      onClick={onClick}
      variant="contained"
      endIcon={!belowWidth ? <FormatColorFillIcon /> : null}
      style={{ padding: belowWidth ? '6px' : '' }}
      aria-label="theme picker"
      size='small'
    >
      {!belowWidth ? 'Theme Picker' : <FormatColorFillIcon />}
    </Button>
  );
}
