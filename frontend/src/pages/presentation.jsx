import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { DashboardButton } from '../components/dashboardButton.jsx';
import { DeletePresentationButton } from '../components/deletePresentationButton.jsx';
import { SlideCard } from '../components/slideCard.jsx';
import { EditTitleButton } from '../components/editTitleButton.jsx';

export function Presentation ({ token, setTokenFunction }) {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = React.useState(null);

  React.useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            Authorization: token,
          }
        });
        const fetchedPresentation = response.data.store.presentations[presentationId];
        console.log(fetchedPresentation);
        setPresentation(fetchedPresentation);
      } catch (err) {
        alert(err);
      }
    };
    if (presentationId) {
      fetchPresentation();
    }
  }, [presentationId, token]);

  if (!presentation) {
    return <div>Loading Presentation...</div>;
  }

  return (
    <>
      <h1>{presentation.title}</h1>
      <LogoutButton token={token} setToken={setTokenFunction}/>
      <EditTitleButton presentation={presentation}/>
      <DashboardButton/>
      <DeletePresentationButton presentationId={presentation.id}/>
      <SlideCard presentation={presentation}/>
    </>
  )
}
