import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { ErrorModal } from '../components/errorModal.jsx';
import { SlideListRearrange } from '../components/slideListRearrange.jsx';
import { ReturnToPresentationButton } from '../components/returnToPresentationButton.jsx';

export function Rearranger ({ token, setTokenFunction }) {
  const navigate = useNavigate();
  const { presentationId } = useParams();
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [presentation, setPresentation] = React.useState(null);
  if (token === null) {
    navigate('/login');
  }

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  React.useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            Authorization: token,
          }
        });
        const fetchedPresentation = response.data.store.presentations[presentationId];
        setPresentation(fetchedPresentation);
      } catch (err) {
        setErrorText(err.response.data.error);
        toggleModalError(!isModalErrorVisible);
      }
    };
    if (presentationId) {
      fetchPresentation();
    }
  }, []);

  const returnToPresentation = () => {
    navigate(`/presentations/${presentationId}/0`);
  }

  if (!presentation) {
    return <div>Loading Presentation...</div>;
  }

  return (
    <>
      <h1>Rearrange Slides</h1>
      <LogoutButton token={token} setToken={setTokenFunction}/>
      <ReturnToPresentationButton onClick={returnToPresentation}/>
      <SlideListRearrange presentation={presentation}/>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  )
}
