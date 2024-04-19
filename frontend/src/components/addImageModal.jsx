import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { fileToDataUrl } from '../helpers';
import { ErrorModal } from '../components/errorModal.jsx';

export function AddImageModal ({ onSubmit, onClose }) {
  const [imageSize, setImageSize] = React.useState({ height: '', width: '' });
  const [imageFile, setImageFile] = React.useState(null);
  const [imageDescription, setImageDescription] = React.useState('');
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const image = await fileToDataUrl(imageFile);
      const newImageElement = {
        elementType: 'image',
        size: imageSize,
        image,
        imageDescription,
        position: {
          x: 0,
          y: 0
        }
      };
      if (Number(imageSize.width) > 0 && Number(imageSize.height) > 0) {
        onSubmit(newImageElement);
        handleClose();
      } else {
        setErrorText('Please enter valid image dimensions.');
        toggleModalError(!isModalErrorVisible);
      }
    } catch (err) {
      setErrorText(err.data.response.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" sx={{ zIndex: 1000002 }}>
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-title" variant="h6" component="h2">
            Upload New Image
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            id="image-size-height"
            label="Image Area Height (%)"
            type="number"
            onChange={(e) => setImageSize({ ...imageSize, height: e.target.value })}
            variant="outlined"
            InputProps={{ endAdornment: '%', inputProps: { min: 0, max: 100 } }}
            helperText="Enter a value from 0 to 100, where 100 is the full height."
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="image-size-width"
            label="Image Area Width (%)"
            type="number"
            onChange={(e) => setImageSize({ ...imageSize, width: e.target.value })}
            variant="outlined"
            InputProps={{ endAdornment: '%', inputProps: { min: 0, max: 100 } }}
            helperText="Enter a value from 0 to 100, where 100 is the full width."
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: 'image/jpeg, image/png' }}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            id="image-description"
            label="Image Description"
            type="text"
            onChange={(e) => setImageDescription(e.target.value)}
            variant="outlined"
            required
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" sx={{ color: '#957dad' }}>Upload</Button>
            <Button onClick={handleClose} sx={{ color: '#957dad' }}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText} />}
    </>
  );
}
