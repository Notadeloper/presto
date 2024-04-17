import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SlideCardPreview } from '../components/slideCardPreview';

export function Preview ({ token, setTokenFunction }) {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = React.useState(null);
  const [slide, setSlide] = React.useState(null);
  const [slideIndex, setSlideIndex] = React.useState(0);

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
        alert(err);
      }
    };
    if (presentationId) {
      fetchPresentation();
    }
  }, []);

  console.log(presentation, setSlideIndex);

  return (
    <SlideCardPreview slide={slide}/>
  );
}
