import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
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
  if (token === null) {
    return <Navigate to="/login" />
  }

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [presentations, setPresentations] = React.useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    fetchData(setPresentations);
  }, []);
  // const [store, setStore] = React.useState({});

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  // axiosget is called everytime [] changes but also runs once at the start
  /* React.useEffect(() => {
    axios.get('http://localhost:5005/store', {
      headers: {
        Authorization: token,
      }
    }).then((response) => {
      console.log(response);
      setStore(response.data.store);
    }).catch((error) => {
      console.log(error);
      alert(error);
    });
  }, []);
  console.log(store); */

  const addNewPresentation = async (presentationName) => {
    const newPresentation = {
      id: uuidv4(), // Random Unique ID generator
      title: presentationName,
      thumbnail: null,
      description: null,
      slides: [{}] // Starting with a single empty slide
    };

    setPresentations(presentations => [newPresentation, ...presentations]);
    toggleModal(); // Hide the modal after adding

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
    <NewPresentationButton onClick={openModal} />
    {isModalVisible && <NewPresentationModal onSubmit={addNewPresentation} onClose={toggleModal} />}
    <PresentationList presentations={presentations} />
  </>;
}

// Note the two ways to use navigate
