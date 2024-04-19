import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { NewPresentationButton } from '../components/newPresentationButton';
import { NewPresentationModal } from '../components/newPresentationModal';
import { PresentationList } from '../components/presentationList';
import { ErrorModal } from '../components/errorModal.jsx';
import { v4 as uuidv4 } from 'uuid';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { appBarStyle, toolBarStyle } from '../styles/style';

export function Dashboard ({ token, setTokenFunction }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [presentations, setPresentations] = React.useState([]);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  if (token === null) {
    navigate('/login');
  }

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  const updateStore = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      if (!currentStore.presentations) {
        currentStore.presentations = {};
      }
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  const fetchData = async (setPresentations) => {
    await updateStore();
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      setPresentations([]);
      const currentPresentations = response.data.store.presentations;
      const presentationKeys = Object.keys(currentPresentations);
      presentationKeys.reverse();

      for (const key of presentationKeys) {
        setPresentations(presentations => [...presentations, currentPresentations[key]]);
      }
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  React.useEffect(() => {
    fetchData(setPresentations);
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const addNewPresentation = async (presentationTitle) => {
    const newPresentation = {
      id: uuidv4(),
      title: presentationTitle,
      thumbnail: null,
      description: '',
      defaultBgColor: null,
      slides: [
        {
          id: uuidv4(),
          elements: [],
          currentBgColor: null
        }
      ]
    };

    setPresentations(presentations => [newPresentation, ...presentations]);
    toggleModal();

    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[newPresentation.id] = newPresentation;

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      navigate(`/presentations/${newPresentation.id}/0`);
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  };

  return <>
    <AppBar sx={appBarStyle}>
      <Toolbar sx={toolBarStyle}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
          Dashboard
        </Typography>
        <LogoutButton token={token} setToken={setTokenFunction}/>
      </Toolbar>
    </AppBar>
    <NewPresentationButton onClick={toggleModal}/>
    {isModalVisible && <NewPresentationModal onSubmit={addNewPresentation} onClose={toggleModal} />}
    <PresentationList presentations={presentations} />
    {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
  </>;
}

// Note the two ways to use navigate
