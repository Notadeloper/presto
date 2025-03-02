import React from 'react';
import { Button, TextField, Box, Typography, Modal, Switch, FormControlLabel } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { ErrorModal } from '../components/errorModal.jsx';

export function EditVideoModal ({ onSubmit, onClose, index }) {
  const [videoSize, setVideoSize] = React.useState({ height: '', width: '' });
  const [videoUrl, setVideoUrl] = React.useState('');
  const [videoAutoplay, setVideoAutoplay] = React.useState(true);
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
    e.preventDefault();
    const editVideoElement = {
      size: videoSize,
      elementType: 'video',
      videoUrl,
      videoAutoplay,
    };
    if (Number(videoSize.width) > 1 && Number(videoSize.height) > 1) {
      onSubmit(editVideoElement, index);
      handleClose();
    } else {
      setErrorText('Please enter valid image dimensions.');
      toggleModalError(!isModalErrorVisible);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" sx={{ zIndex: 1000002 }}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Current Video
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            id="video-size-height"
            label="Video Area Height (%)"
            type="number"
            onChange={(e) => setVideoSize({ ...videoSize, height: e.target.value })}
            variant="outlined"
            InputProps={{ endAdornment: '%', inputProps: { min: 1, max: 100 } }}
            helperText="Enter a value from 1 to 100, where 100 is the full height to resize the video."
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="video-size-width"
            label="Video Area Width (%)"
            type="number"
            onChange={(e) => setVideoSize({ ...videoSize, width: e.target.value })}
            variant="outlined"
            InputProps={{ endAdornment: '%', inputProps: { min: 1, max: 100 } }}
            helperText="Enter a value from 1 to 100, where 100 is the full widthto resize the video."
            required
          />
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
            <Button type="submit" sx={{ color: '#957dad' }}>Edit</Button>
            <Button onClick={handleClose} sx={{ color: '#957dad' }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText} />}
    </>
  );
}
