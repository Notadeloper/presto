import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const presentationModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function NewPresentationModal ({ onSubmit, onClose }) {
  const [presentationName, setPresentationName] = React.useState('');
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(presentationName);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={presentationModalStyle} component="form" onSubmit={handleSubmit}>
        <Typography id="modal-title" variant="h6" component="h2">
          Enter Presentation Title
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="presentation-name"
          label="Presentation Name"
          type="text"
          value={presentationName}
          onChange={(e) => setPresentationName(e.target.value)}
          variant="outlined"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit">Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
}
