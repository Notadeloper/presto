import React from 'react';
import { Button, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { HexColorPicker } from 'react-colorful';

export function ThemePickerModal ({ onSubmit, onClose }) {
  const [currentSlideBackground, setCurrentSlideBackground] = React.useState('#ffffff');
  const [defaultBackground, setDefaultBackground] = React.useState('#ffffff');
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(currentSlideBackground, defaultBackground);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ zIndex: 1000002 }}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2">
          Choose Background Colors
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Choose current slide background:</Typography>
        <HexColorPicker color={currentSlideBackground} onChange={setCurrentSlideBackground} />
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 2 }}>Choose default slide background:</Typography>
        <HexColorPicker color={defaultBackground} onChange={setDefaultBackground} />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" sx={{ color: '#957dad' }}>Save Changes</Button>
          <Button onClick={handleClose} sx={{ color: '#957dad' }}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  )
}
