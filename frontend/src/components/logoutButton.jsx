import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

export function LogoutButton ({ token, setToken }) {
  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token,
        }
      });
      setToken(null);
      localStorage.removeItem('token');
    } catch (err) {
      alert(err.response.data.error);
    }
  }

  return (
    <Button onClick={logout} variant="contained" color="error" endIcon={<LogoutIcon />}>
      Logout
    </Button>
  );
}
