import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';

export function AddTextModal ({ onSubmit, onClose }) {
  const [textSize, setTextSize] = React.useState({ height: '', width: '' });
  const [textColor, setTextColor] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');
  const [textContent, setTextContent] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTextElement = {
      textSize,
      fontSize,
      textColor,
      textContent,
    };
    onSubmit(newTextElement);
    handleClose();
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
          label="Text Area Height (px)"
          type="number"
          value={textSize.height}
          onChange={(e) => setTextSize({ ...textSize, height: e.target.value })}
          variant="outlined"
          InputProps={{ endAdornment: 'px' }}
        />
        <TextField
          fullWidth
          margin="normal"
          id="text-size-width"
          label="Text Area Width (px)"
          type="number"
          value={textSize.width}
          onChange={(e) => setTextSize({ ...textSize, width: e.target.value })}
          variant="outlined"
          InputProps={{ endAdornment: 'px' }}
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
        />
        <TextField
          fullWidth
          margin="normal"
          id="text-color"
          label="Text Color"
          type="text"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          variant="outlined"
          InputProps={{ startAdornment: '#' }}
        />
        <TextField
          fullWidth
          margin="normal"
          id="text-size-width"
          label="Text Content"
          type="text"
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          variant="outlined"
          multiline
          rows={5}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit">Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
