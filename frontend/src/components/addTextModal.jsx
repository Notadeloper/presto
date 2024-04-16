import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';

export function AddTextModal ({ onSubmit, onClose }) {
  const [textSize, setTextSize] = React.useState({ height: '', width: '' });
  const [textColor, setTextColor] = React.useState('');
  const [fontSize, setFontSize] = React.useState('sans-serif');
  const [fontFamily, setFontFamily] = React.useState('');
  const [elementContent, setElementContent] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const isValidHexColor = (hex) => {
    return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
  }
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stops default submitting of form
    const newTextElement = {
      elementType: 'text',
      textSize,
      fontSize,
      fontFamily,
      textColor,
      elementContent,
      textPosition: {
        x: 0,
        y: 0
      }
    };
    if (Number(textSize.width) > 0 && Number(textSize.height) > 0 && Number(fontSize) > 0 && isValidHexColor(textColor)) {
      onSubmit(newTextElement);
      handleClose();
    } else {
      alert('Please re-enter valid inputs');
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2">
          Create New Text Box
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="text-size-height"
          label="Text Area Height (%)"
          type="number"
          value={textSize.height}
          onChange={(e) => setTextSize({ ...textSize, height: e.target.value })}
          variant="outlined"
          InputProps={{ endAdornment: '%', inputProps: { min: 0, max: 100 } }}
          helperText="Enter a value from 0 to 100, where 100 is the full height."
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="text-size-width"
          label="Text Area Width (%)"
          type="number"
          value={textSize.width}
          onChange={(e) => setTextSize({ ...textSize, width: e.target.value })}
          variant="outlined"
          InputProps={{ endAdornment: '%', inputProps: { min: 0, max: 100 } }}
          helperText="Enter a value from 0 to 100, where 100 is the full width."
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="font-size"
          label="Font Size (em)"
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          variant="outlined"
          InputProps={{ endAdornment: 'em' }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="font-size"
          label="Font Family"
          type="text"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          variant="outlined"
        />
        <TextField
          fullWidth
          margin="normal"
          id="text-color"
          label="Text Color (Hex Code)"
          type="text"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          variant="outlined"
          InputProps={{ startAdornment: '#' }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="text-size-width"
          label="Text Content"
          type="text"
          value={elementContent}
          onChange={(e) => setElementContent(e.target.value)}
          variant="outlined"
          multiline
          rows={5}
          required
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit">Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
