import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { modalStyle } from '../styles/style.jsx';

export function DeletePresentationModal ({ onSubmit, onClose, presentationId }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(presentationId);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ zIndex: 1000002 }}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2">
          Are you sure you want to delete this presentation? This action cannot be undone.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" sx={{ color: '#957dad' }}>Delete</Button>
          <Button onClick={handleClose} sx={{ color: '#957dad' }}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
