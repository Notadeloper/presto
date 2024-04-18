import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { ErrorModal } from '../components/errorModal.jsx';

export function EditTextModal ({ onSubmit, onClose, index }) {
  const [textColor, setTextColor] = React.useState('');
  const [fontSize, setFontSize] = React.useState('');
  const [fontFamily, setFontFamily] = React.useState('sans-serif');
  const [elementContent, setElementContent] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  const isValidHexColor = (hex) => {
    return /^#?([0-9A-F]{3}){1,2}$/i.test(hex);
  }
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stops default submitting of form
    const editTextElement = {
      elementType: 'text',
      fontSize,
      fontFamily,
      textColor,
      elementContent,
    };
    if (Number(fontSize) > 0 && isValidHexColor(textColor)) {
      onSubmit(editTextElement, index);
      handleClose();
    } else {
      setErrorText('Please re-enter valid inputs!');
      toggleModalError(!isModalErrorVisible);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Text Box
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            id="font-size"
            label="Font Size (em)"
            type="number"
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
            onChange={(e) => setFontFamily(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            id="text-color"
            label="Text Color (Hex Code)"
            type="text"
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
            onChange={(e) => setElementContent(e.target.value)}
            variant="outlined"
            multiline
            rows={5}
            required
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit">Edit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
