import React from 'react';
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import { divWrapperStyle } from '../styles/style';
import { ErrorModal } from '../components/errorModal.jsx';

export function Register ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const navigate = useNavigate();

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  if (token !== null) {
    return <Navigate to="/dashboard" />
  }

  const navigateToLogin = () => {
    navigate('/login');
  }

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match.');
      toggleModalError(!isModalErrorVisible);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/register', {
        email,
        password,
        name
      });
      setTokenFunction(response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  return (
    <>
      <Box sx={divWrapperStyle} component="form" onSubmit={(e) => {
        e.preventDefault();
        register();
      }}>
        <Typography variant="h5" textAlign="center" component="h1" marginBottom={2}>
          Register
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          name="register-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="register-password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="confirm-register-password"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="user-name"
          label="Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
          required
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} aria-label="register">
          Register
        </Button>
        <Button variant="contained" color="secondary" type="button" onClick={navigateToLogin} sx={{ mt: 3 }}>
          Already have an account? Log In
        </Button>
      </Box>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
