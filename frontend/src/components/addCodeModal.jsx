import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { ErrorModal } from '../components/errorModal.jsx';

export function AddCodeModal ({ onSubmit, onClose }) {
  const [codeSize, setCodeSize] = React.useState({ height: '', width: '' });
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
    const newCodeElement = {
      elementType: 'code',
      size: codeSize,
      fontSize,
      elementContent,
      position: {
        x: 0,
        y: 0
      }
    };
    if (Number(codeSize.width) > 0 && Number(codeSize.height) > 0 && Number(fontSize) > 0) {
      onSubmit(newCodeElement);
      handleClose();
    } else {
      setErrorText('Please re-enter valid inputs!');
      toggleModalError(!isModalErrorVisible);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" sx={{ zIndex: 1000002 }}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-title" variant="h6" component="h2">
            Create New Code Box
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            id="code-size-height"
            label="Code Area Height (%)"
            type="number"
            value={codeSize.height}
            onChange={(e) => setCodeSize({ ...codeSize, height: e.target.value })}
            variant="outlined"
            InputProps={{ endAdornment: '%', inputProps: { min: 0, max: 100 } }}
            helperText="Enter a value from 0 to 100, where 100 is the full height."
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="code-size-width"
            label="Code Area Width (%)"
            type="number"
            value={codeSize.width}
            onChange={(e) => setCodeSize({ ...codeSize, width: e.target.value })}
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
            <Button type="submit" sx={{ color: '#957dad' }}>Create</Button>
            <Button onClick={handleClose} sx={{ color: '#957dad' }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
