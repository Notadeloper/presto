import React from 'react';
import Button from '@mui/material/Button';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

export function ThemePickerButton ({ onClick }) {
  return (
    <Button onClick={onClick} variant="contained" endIcon={<FormatColorFillIcon />} aria-label="theme picker" size='small'>
      Theme Picker
    </Button>
  );
}
