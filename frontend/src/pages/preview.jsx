import React from 'react';
import axios from 'axios';
import { Slide, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { SlideCardPreview } from '../components/slideCardPreview';
import { SlideLeftButton } from '../components/slideLeftButton.jsx';
import { SlideRightButton } from '../components/slideRightButton.jsx';
import { ErrorModal } from '../components/errorModal.jsx';
import { previewFlexContainer } from '../styles/style.jsx';
import { appBarStyle, toolBarStyle, presentationTitleStyle } from '../styles/style';

export function Preview ({ token, setTokenFunction }) {
  const { presentationId, urlSlideIndex } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = React.useState(null);
  const [slide, setSlide] = React.useState(null);
  const [slideIndex, setSlideIndex] = React.useState(Number(urlSlideIndex));
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [inProp, setInProp] = React.useState(true);
  const [direction, setDirection] = React.useState('left');
  const [notStartedNavigation, setNotStartedNavigation] = React.useState(true);

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

  React.useEffect(() => {
    if (presentation?.slides?.length > slideIndex) {
      setSlide(presentation.slides[slideIndex]);
    }
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        doSlideLeft();
      } else if (event.key === 'ArrowRight') {
        doSlideRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideIndex, presentation]);

  const doSlideLeft = async () => {
    if (slideIndex > 0) {
      setDirection('left');
      setNotStartedNavigation(false);
      setInProp(false);
      setTimeout(async () => {
        const currentSlideIndex = slideIndex;
        setSlideIndex(slideIndex - 1);
        try {
          const response = await axios.get('http://localhost:5005/store', {
            headers: {
              Authorization: token,
            }
          });
          const currentStore = response.data.store;
          const currentPresentations = currentStore.presentations;
          setSlide(currentPresentations[presentationId].slides[currentSlideIndex - 1]);
          navigate(`/presentations/${presentationId}/${currentSlideIndex - 1}/preview`);
          setDirection('right');
          setInProp(true);
        } catch (err) {
          setErrorText(err.response.data.error);
          toggleModalError(!isModalErrorVisible);
        }
      }, 200);
    }
  }

  const doSlideRight = async () => {
    if (slideIndex < presentation.slides.length - 1) {
      setDirection('right');
      setNotStartedNavigation(false);
      setInProp(false);
      setTimeout(async () => {
        const currentSlideIndex = slideIndex;
        setSlideIndex(slideIndex + 1);
        try {
          const response = await axios.get('http://localhost:5005/store', {
            headers: {
              Authorization: token,
            }
          });
          const currentStore = response.data.store;
          const currentPresentations = currentStore.presentations;
          setSlide(currentPresentations[presentationId].slides[currentSlideIndex + 1]);
          navigate(`/presentations/${presentationId}/${currentSlideIndex + 1}/preview`);
          setDirection('left');
          setInProp(true);
        } catch (err) {
          setErrorText(err.response.data.error);
          toggleModalError(!isModalErrorVisible);
        }
      }, 200);
    }
  }

  if (!presentation || !slide) {
    return <div>Loading Presentation...</div>;
  }

  return (
    <>
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolBarStyle}>
          <Typography variant="h5" component="div" sx={presentationTitleStyle}>
            {presentation.title}
          </Typography>
          <LogoutButton token={token} setToken={setTokenFunction}/>
        </Toolbar>
      </AppBar>
      <Box sx={previewFlexContainer}>
        <Box sx={{ position: 'absolute', top: '30px' }}>
          {notStartedNavigation
            ? (<SlideCardPreview slide={slide} slideIndex={slideIndex} defaultBackgroundColor={presentation.defaultBgColor}/>)
            : (
            <Slide in={inProp} direction={direction}>
              <div>
                <SlideCardPreview slide={slide} slideIndex={slideIndex} defaultBackgroundColor={presentation.defaultBgColor}/>
              </div>
            </Slide>
              )}
        </Box>
        <Box sx={{ position: 'absolute', left: 0, top: '38vh' }}>
          {slideIndex > 0 && <SlideLeftButton onClick={doSlideLeft} />}
        </Box>
        <Box sx={{ position: 'absolute', right: 0, top: '38vh' }}>
          {slideIndex < presentation.slides.length - 1 && <SlideRightButton onClick={doSlideRight}/>}
        </Box>
        {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
      </Box>
    </>
  );
}
