import React from 'react';
import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { fileToDataUrl } from '../helpers';
import { ErrorModal } from '../components/errorModal.jsx';

export function EditImageModal ({ onSubmit, onClose, index }) {
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
        image,
        imageDescription,
      };
      console.log(image);
      onSubmit(editImageElement, index);
      handleClose();
    } catch (err) {
      setErrorText(err.data.response.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Image Description
          </Typography>
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
            <Button type="submit">Edit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText} />}
    </>
  );
}
