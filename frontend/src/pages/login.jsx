import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import { divWrapperStyle } from '../styles/style';
import { ErrorModal } from '../components/errorModal.jsx';

export function Login ({ token, setTokenFunction }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const navigate = useNavigate();

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  if (token !== null) {
    navigate('/dashboard');
  }

  const navigateToRegister = () => {
    navigate('/register');
  }

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:5005/admin/auth/login', {
        email,
        password,
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
        login();
      }}>
        <Typography variant="h5" textAlign="center" component="h1" marginBottom={2}>
          Login
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Email Address"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          variant="outlined"
          required
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} aria-label="login">
          Log In
        </Button>
        <Button variant="contained" color="secondary" type="button" data-testid="register-button" onClick={navigateToRegister} sx={{ mt: 3 }}>
          Need an account? Register
        </Button>
      </Box>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
