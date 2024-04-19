import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { fileToDataUrl } from '../helpers';
import { ErrorModal } from '../components/errorModal.jsx';

export function EditImageModal ({ onSubmit, onClose, index }) {
  const [imageSize, setImageSize] = React.useState({ height: '', width: '' });
  const [imageDescription, setImageDescription] = React.useState('');
  const [imageFile, setImageFile] = React.useState(null);
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
      const editImageElement = {
        elementType: 'image',
        size: imageSize,
        image,
        imageDescription,
      };
      if (Number(imageSize.width) > 1 && Number(imageSize.height) > 1) {
        onSubmit(editImageElement, index);
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
            Edit Image Description
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            id="image-size-height"
            label="Image Area Height (%)"
            type="number"
            onChange={(e) => setImageSize({ ...imageSize, height: e.target.value })}
            variant="outlined"
            InputProps={{ endAdornment: '%', inputProps: { min: 1, max: 100 } }}
            helperText="Enter a value from 1 to 100, where 100 is the full height to resize the image."
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
            InputProps={{ endAdornment: '%', inputProps: { min: 1, max: 100 } }}
            helperText="Enter a value from 1 to 100, where 100 is the full width to resize the image."
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
            id="text-size-width"
            label="Image Description"
            type="text"
            onChange={(e) => setImageDescription(e.target.value)}
            variant="outlined"
            required
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
