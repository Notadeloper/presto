import React from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { ErrorModal } from '../components/errorModal.jsx';

export function Rearranger ({ token, setTokenFunction }) {
  const navigate = useNavigate();
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  // const [errorText, setErrorText] = React.useState('');
  // const [slides, setSlides] = React.useState([]);
  if (token === null) {
    navigate('/login');
  }

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  return <>
    <h1>Rearrange Slides</h1>
    <LogoutButton token={token} setToken={setTokenFunction}/> <br />
    {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={'sup'}/>}
  </>;
}
