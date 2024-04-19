import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';

export function NewPresentationModal ({ onSubmit, onClose }) {
  const [presentationTitle, setPresentationTitle] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(presentationTitle);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" sx={{ zIndex: 1000002 }}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2">
          Enter Presentation Title
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="presentation-title"
          label="Presentation Title"
          type="text"
          value={presentationTitle}
          onChange={(e) => setPresentationTitle(e.target.value)}
          variant="outlined"
          aria-label="Presentation title"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" sx={{ color: '#957dad' }}>Create</Button>
          <Button onClick={handleClose} sx={{ color: '#957dad' }}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
