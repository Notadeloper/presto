import React from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { NewPresentationButton } from '../components/newPresentationButton';
import { NewPresentationModal } from '../components/newPresentationModal';
import { PresentationList } from '../components/presentationList';
import { v4 as uuidv4 } from 'uuid';

export function Dashboard ({ token, setTokenFunction }) {
  const [store, setStore] = React.useState({});
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [presentations, setPresentations] = React.useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    // Placeholder for fetching presentations data
  }, []);

  const addNewPresentation = (presentationName) => {
    const newPresentation = {
      id: uuidv4(), // Random Unique ID generator
      name: presentationName,
      slides: [{}] // Starting with a single empty slide
    };
    setPresentations([...presentations, newPresentation]);
    toggleModal(); // Hide the modal after adding
    axios.put('http://localhost:5005/store', { store: newPresentation }, {
      headers: {
        Authorization: token,
      }
    }).then(response => {
      console.log(newPresentation);
    }).catch((error) => {
      console.error(error);
      // Optionally revert the optimistic UI update or notify the user
    });
  };
  // axiosget is called everytime [] changes but also runs once at the start
  React.useEffect(() => {
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
  console.log(store);

  if (token === null) {
    return <Navigate to="/login" />
  }
  return <>
    <h1>Dashboard</h1>
    <LogoutButton token={token} setToken={setTokenFunction}/> <br />
    <NewPresentationButton onClick={toggleModal} />
    {isModalVisible && <NewPresentationModal onSubmit={addNewPresentation} onClose={toggleModal} />}
    <PresentationList presentations={presentations} />
    <ul>
      {presentations.map(presentation => (
        <li key={presentation.id}>{presentation.name}</li> // Display each user's name
      ))}
      </ul>
  </>;
}

// Note the two ways to use navigate
