import React from 'react';
import { Button, Box, Typography, Modal } from '@mui/material';
import { errorModalStyle } from '../styles/style.jsx';

export function ErrorModal ({ onClose, errorText }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ zIndex: 1000002 }}>
      <Box sx={errorModalStyle} onSubmit={handleClose}>
        <Typography id="modal-title" variant="body1" component="h2">
          {errorText}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} sx={{ color: '#957dad' }}>Close Error</Button>
        </Box>
      </Box>
    </Modal>
  )
}
