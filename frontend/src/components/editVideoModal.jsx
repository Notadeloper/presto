import React from 'react';
import { Button, TextField, Box, Typography, Modal, Switch, FormControlLabel } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';

export function EditVideoModal ({ onSubmit, onClose, index }) {
  const [videoUrl, setVideoUrl] = React.useState('');
  const [videoAutoplay, setVideoAutoplay] = React.useState(true);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editVideoElement = {
      elementType: 'video',
      videoUrl,
      videoAutoplay,
    };
    onSubmit(editVideoElement, index);
    handleClose();
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Current Video
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            id="text-size-width"
            label="Video Url"
            type="text"
            onChange={(e) => setVideoUrl(e.target.value)}
            variant="outlined"
            helperText="Please enter an embedded link."
            required
          />
          <FormControlLabel
            label="Autoplay Video"
            control={
              <Switch
                checked={videoAutoplay}
                onChange={(e) => setVideoAutoplay(e.target.checked)}
                name="autoplay"
                color="primary"
              />
            }
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit">Edit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
