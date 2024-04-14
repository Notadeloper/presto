import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { NewPresentationButton } from '../components/newPresentationButton';
import { NewPresentationModal } from '../components/newPresentationModal';
import { PresentationList } from '../components/presentationList';
import { v4 as uuidv4 } from 'uuid';

const updateStore = async () => {
  const token = localStorage.getItem('token');
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
    alert(err.response.data.error);
  }
}

const fetchData = async (setPresentations) => {
  const token = localStorage.getItem('token');
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
    alert(err.response.data.error);
  }
}

export function Dashboard ({ token, setTokenFunction }) {
  const navigate = useNavigate();
  if (token === null) {
    navigate('/login');
  }

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [presentations, setPresentations] = React.useState([]);
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
      description: null,
      slides: [
        {
          id: uuidv4(),
          elements: null,
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
      navigate(`/presentations/${newPresentation.id}`);
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return <>
    <h1>Dashboard</h1>
    <LogoutButton token={token} setToken={setTokenFunction}/> <br />
    <NewPresentationButton onClick={toggleModal} />
    {isModalVisible && <NewPresentationModal onSubmit={addNewPresentation} onClose={toggleModal} />}
    <PresentationList presentations={presentations} />
  </>;
}

// Note the two ways to use navigate
