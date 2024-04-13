import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

export function DeletePresentationButton ({ presentationId }) {
  const navigate = useNavigate(); // Get the navigate function

  const deletePresentation = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      delete currentPresentations[presentationId];

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.error);
    }
  };
  return (
    <Button onClick={deletePresentation} variant="contained" color="error" endIcon={<DeleteIcon />}>
      Delete Presentation
    </Button>
  );
}
