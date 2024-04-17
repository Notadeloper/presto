import React from 'react';
import { Button, Input, Box, Typography, Modal } from '@mui/material';
import { modalStyle } from '../styles/style.jsx';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('thumbnail', file);
      onSubmit(presentationId, formData);
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
