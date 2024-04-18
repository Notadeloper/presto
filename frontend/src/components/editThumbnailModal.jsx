import React from 'react';
import { Button, Input, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';
import { fileToDataUrl } from '../helpers';

export function EditThumbnailModal ({ onSubmit, onClose, presentationId }) {
  const [file, setFile] = React.useState(null);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const data = await fileToDataUrl(file);
        onSubmit(presentationId, data);
      } catch (error) {
        console.error('Error converting file to data URL: ', error);
      }
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-thumbnail" variant="h6" component="h2">
          Enter New Presentation Thumbnail
        </Typography>
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ margin: '20px 0' }}
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit">Save Changes</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  )
}
