import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { ErrorModal } from '../components/errorModal.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';

export function LogoutButton ({ token, setToken }) {
  const navigate = useNavigate();
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const belowWidth = useMediaQuery('(max-width:680px)');

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5005/admin/auth/logout', {}, {
        headers: {
          Authorization: token,
        }
      });
      setToken(null);
      localStorage.removeItem('token');
      localStorage.removeItem('currentPresentationId');
      navigate('/login');
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  return (
    <>
      <Button
        onClick={logout}
        variant="contained"
        color="error"
        endIcon={!belowWidth ? <LogoutIcon /> : null}
        style={{ padding: belowWidth ? '6px' : '' }}
        aria-label="logout button"
      >
        {!belowWidth ? 'Logout' : <LogoutIcon />}
      </Button>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText} />}
    </>
  );
}
