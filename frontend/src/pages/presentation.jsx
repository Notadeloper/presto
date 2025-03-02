import React from 'react';
import axios from 'axios';
import { Slide, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { DashboardButton } from '../components/dashboardButton.jsx';
import { DeletePresentationButton } from '../components/deletePresentationButton.jsx';
import { DeletePresentationModal } from '../components/deletePresentationModal.jsx';
import { SlideCard } from '../components/slideCard.jsx';
import { EditTitleButton } from '../components/editTitleButton.jsx';
import { EditTitleModal } from '../components/editTitleModal.jsx';
import { EditThumbnailButton } from '../components/editThumbnailButton.jsx';
import { EditThumbnailModal } from '../components/editThumbnailModal.jsx';
import { NewSlideButton } from '../components/newSlideButton.jsx';
import { SlideLeftButton } from '../components/slideLeftButton.jsx';
import { SlideRightButton } from '../components/slideRightButton.jsx';
import { ViewPreviewButton } from '../components/viewPreviewButton.jsx';
import { DeleteSlideButton } from '../components/deleteSlideButton.jsx';
import { ToolsMenu } from '../components/toolsMenu.jsx';
import { ErrorModal } from '../components/errorModal.jsx';
import { ErrorDeleteSlideModal } from '../components/errorDeleteSlideModal.jsx';
import { v4 as uuidv4 } from 'uuid';
import { ThemePickerButton } from '../components/themePickerButton.jsx';
import { ThemePickerModal } from '../components/themePickerModal.jsx';
import { SlideRearrangeButton } from '../components/slideRearrangeButton.jsx';
import { appBarStyle, toolBarStyle, toolBoxStyle, buttonBoxStyle, presentationTitleStyle } from '../styles/style';

export function Presentation ({ token, setTokenFunction }) {
  const { presentationId, urlSlideIndex } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = React.useState(null);
  const [slide, setSlide] = React.useState(null);
  const [slideIndex, setSlideIndex] = React.useState(Number(urlSlideIndex));
  const [isModalDeletePresVisible, setIsModalDeletePresVisible] = React.useState(false);
  const [isModalEditTitleVisible, setIsModalEditTitleVisible] = React.useState(false);
  const [isModalEditThumbnailVisible, setIsModalEditThumbnailVisible] = React.useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [isModalErrorDeleteSlideVisible, setIsModalErrorDeleteSlideVisible] = React.useState(false);
  const [isModalThemePickerVisible, setIsModalThemePickerVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [inProp, setInProp] = React.useState(true);
  const [direction, setDirection] = React.useState('left');
  const [notStartedNavigation, setNotStartedNavigation] = React.useState(true);

  if (token === null) {
    navigate('/login');
  }

  localStorage.setItem('currentPresentationId', presentationId);

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

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  const toggleModalThemePicker = () => {
    setIsModalThemePickerVisible(!isModalThemePickerVisible);
  };

  const toggleModalErrorDeleteSlide = () => {
    setIsModalErrorDeleteSlideVisible(!isModalErrorDeleteSlideVisible);
  };

  const toggleModalDeletePres = () => {
    setIsModalDeletePresVisible(!isModalDeletePresVisible);
  };

  const deletePresentation = async (presentationId) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      delete currentPresentations[presentationId];

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      navigate('/dashboard');
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  };

  const toggleModalEditTitle = () => {
    setIsModalEditTitleVisible(!isModalEditTitleVisible);
  };

  const editPresentationTitle = async (presentationId, presentationTitle) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[presentationId].title = presentationTitle;

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        title: presentationTitle
      }));
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  };

  const toggleModalEditThumbnail = () => {
    setIsModalEditThumbnailVisible(!isModalEditThumbnailVisible);
  };

  const editPresentationThumbnail = async (presentationId, presentationThumbnail) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[presentationId].thumbnail = presentationThumbnail;

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        thumbnail: presentationThumbnail
      }));
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  };

  const createNewSlide = async (presentationId) => {
    const newSlide = {
      id: uuidv4(),
      elements: [],
      currentBgColor: null
    }
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[presentationId].slides.push(newSlide);

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        slides: currentPresentations[presentationId].slides
      }));
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  const doSlideLeft = async () => {
    if (slideIndex > 0) {
      setDirection('left');
      setNotStartedNavigation(false);
      setInProp(false);
      setTimeout(async () => {
        const currentSlideIndex = slideIndex;
        setSlideIndex(Number(slideIndex) - 1);
        try {
          const response = await axios.get('http://localhost:5005/store', {
            headers: {
              Authorization: token,
            }
          });
          const currentStore = response.data.store;
          const currentPresentations = currentStore.presentations;
          setSlide(currentPresentations[presentationId].slides[Number(currentSlideIndex) - 1]);
          setDirection('right');
          navigate(`/presentations/${presentationId}/${Number(currentSlideIndex) - 1}`);
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
        setSlideIndex(Number(slideIndex) + 1);
        try {
          const response = await axios.get('http://localhost:5005/store', {
            headers: {
              Authorization: token,
            }
          });
          const currentStore = response.data.store;
          const currentPresentations = currentStore.presentations;
          setSlide(currentPresentations[presentationId].slides[Number(currentSlideIndex) + 1]);
          navigate(`/presentations/${presentationId}/${Number(currentSlideIndex) + 1}`);
          setDirection('left');
          setInProp(true);
        } catch (err) {
          setErrorText(err.response.data.error);
          toggleModalError(!isModalErrorVisible);
        }
      }, 200);
    }
  }

  const deleteSlide = async () => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const currentSlides = currentPresentations[presentationId].slides;
      if (currentSlides.length === 1) {
        toggleModalErrorDeleteSlide();
        return;
      }
      const updatedSlides = currentSlides.filter(s => s.id !== slide.id);
      const previousSlideIndex = Number(currentSlides.findIndex(s => s.id === slide.id));
      currentPresentations[presentationId].slides = updatedSlides;

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        slides: updatedSlides
      }));
      if (previousSlideIndex > 0) {
        setSlide(currentSlides[previousSlideIndex - 1]);
        setSlideIndex(previousSlideIndex - 1);
        navigate(`/presentations/${presentationId}/${previousSlideIndex - 1}`);
      } else if (previousSlideIndex === 0) {
        setSlide(currentSlides[0]);
        setSlideIndex(0);
        navigate(`/presentations/${presentationId}/${Number(0)}`);
      }
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  const deleteElement = async (elementIndex, slide) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const slideId = slide.id;
      const currentSlide = currentPresentations[presentationId].slides.find(s => s.id === slideId);
      currentSlide.elements = currentSlide.elements.filter((_, index) => index !== elementIndex);
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
    } catch (err) {
    }
  }

  const updateElementContent = async (elementIndex, slide, updatedContent) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const currentSlide = currentPresentations[presentationId].slides.find(s => s.id === slide.id);
      const currentElement = currentSlide.elements[elementIndex];
      currentElement.elementContent = updatedContent;
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  const openPreview = () => {
    const previewUrl = window.location.origin + '/presentations' + `/${presentationId}` + '/0' + '/preview';
    window.open(previewUrl, '_blank');
  }

  const openRearrange = () => {
    navigate(`/presentations-rearrange/${presentationId}`);
  }

  const updateBackgroundColour = async (currentBackgroundColor, defaultBackgroundColor) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentation = currentStore.presentations[presentationId];
      currentPresentation.defaultBgColor = defaultBackgroundColor;
      const currentSlide = currentPresentation.slides.find(s => s.id === slide.id);
      currentSlide.currentBgColor = currentBackgroundColor;
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
      setPresentation(currentPresentation);
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
    console.log(currentBackgroundColor, defaultBackgroundColor);
  }

  if (!presentation) {
    return <div>Loading Presentation...</div>;
  }

  return (
    <>
      <AppBar sx={appBarStyle}>
        <Toolbar sx={toolBarStyle}>
          <Typography variant="h5" component="div" sx={presentationTitleStyle}>
            {presentation.title}
          </Typography>
          <DashboardButton/>
          <LogoutButton token={token} setToken={setTokenFunction}/>
        </Toolbar>
      </AppBar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Box sx={buttonBoxStyle}>
          <EditTitleButton onClick={toggleModalEditTitle}/>
          <EditThumbnailButton onClick={toggleModalEditThumbnail}/>
          <DeletePresentationButton onClick={toggleModalDeletePres}/>
          <DeleteSlideButton onClick={deleteSlide}/>
        </Box>
      </Toolbar>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Box sx={buttonBoxStyle}>
          <NewSlideButton onClick={createNewSlide} presentationId={presentationId}/>
          <ThemePickerButton onClick={toggleModalThemePicker}/>
          <ViewPreviewButton onClick={openPreview}/>
          <SlideRearrangeButton onClick={openRearrange}/>
        </Box>
      </Toolbar>
      <Box sx={toolBoxStyle}>
        <ToolsMenu slide={slide} setSlide={setSlide}/>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        my: 4
      }}>
        {
          Number(slideIndex) > 0
            ? <SlideLeftButton onClick={doSlideLeft}/>
            : <div style={{ width: '24px', height: '64px', backgroundColor: 'transparent' }}></div>
        }
        {notStartedNavigation
          ? (<SlideCard slide={slide} setSlide={setSlide} slideIndex={slideIndex} deleteElement={deleteElement} updateElementContent={updateElementContent} defaultBackgroundColor={presentation.defaultBgColor} />)
          : (
          <Slide in={inProp} direction={direction}>
            <div>
            <SlideCard slide={slide} setSlide={setSlide} slideIndex={slideIndex} deleteElement={deleteElement} updateElementContent={updateElementContent} defaultBackgroundColor={presentation.defaultBgColor} />
            </div>
          </Slide>
            )}
        {
          Number(slideIndex) < presentation.slides.length - 1
            ? <SlideRightButton onClick={doSlideRight}/>
            : <div style={{ width: '24px', height: '64px', backgroundColor: 'transparent' }}></div>
        }
      </Box>
      {isModalDeletePresVisible && <DeletePresentationModal onSubmit={deletePresentation} onClose={toggleModalDeletePres} presentationId={presentationId} />}
      {isModalEditTitleVisible && <EditTitleModal onSubmit={editPresentationTitle} onClose={toggleModalEditTitle} presentationId={presentationId} currentPresentationTitle={presentation.title} />}
      {isModalEditThumbnailVisible && <EditThumbnailModal onSubmit={editPresentationThumbnail} onClose={toggleModalEditThumbnail} presentationId={presentationId} />}
      {isModalThemePickerVisible && <ThemePickerModal onSubmit={updateBackgroundColour} onClose={toggleModalThemePicker}/>}
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
      {isModalErrorDeleteSlideVisible && <ErrorDeleteSlideModal onSubmit={deletePresentation} onClose={toggleModalErrorDeleteSlide} presentationId={presentationId} />}
    </>
  )
}
