import React from 'react';
import { Button, Box, Typography, Modal } from '@mui/material';
import { errorModalStyle } from '../styles/style.jsx';

export function ErrorDeleteSlideModal ({ onSubmit, onClose, presentationId }) {
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
      <Box sx={errorModalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="body1" component="h2">
          This is the last slide left in the presentation! Delete presentation instead?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="error" sx={{ color: '#957dad' }}>Delete Presentation</Button>
          <Button onClick={handleClose} sx={{ color: '#957dad' }}>Close Error</Button>
        </Box>
      </Box>
    </Modal>
  )
}
