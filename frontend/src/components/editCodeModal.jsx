import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { ErrorModal } from '../components/errorModal.jsx';

export function EditCodeModal ({ onSubmit, onClose, index }) {
  const [fontSize, setFontSize] = React.useState('');
  const [elementContent, setElementContent] = React.useState('');
  const [open, setOpen] = React.useState(true);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Stops default submitting of form
    const editCodeElement = {
      elementType: 'code',
      fontSize,
      elementContent,
    };
    if (Number(fontSize) > 0) {
      onSubmit(editCodeElement, index);
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
            Edit Code Box
          </Typography>
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
            id="text-size-width"
            label="Code Content"
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
    {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
