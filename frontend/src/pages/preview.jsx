import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SlideCardPreview } from '../components/slideCardPreview';
import { ErrorModal } from '../components/errorModal.jsx';

export function Preview ({ token, setTokenFunction }) {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = React.useState(null);
  const [slide, setSlide] = React.useState(null);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

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
        setSlide(fetchedPresentation.slides[slideIndex]);
      } catch (err) {
        setErrorText(err.response.data.error);
        toggleModalError(!isModalErrorVisible);
      }
    };
    if (presentationId) {
      fetchPresentation();
    }
  }, []);

  console.log(presentation, setSlideIndex);

  return (
    <>
      <SlideCardPreview slide={slide}/>
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
